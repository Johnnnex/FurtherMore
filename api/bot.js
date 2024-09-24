const supabase = require("./config");
const TelegramBot = require("node-telegram-bot-api");

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

const handleStartCommand = async (msg, match) => {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name ? msg.from.first_name : "";
  const refCode = match && match[1] ? parseInt(match[1]) : null;
  console.log(match);
  const caption = `Welcome${
    firstName ? `, *${firstName}*,` : ""
  } to *Furthermore*\\! 🎉

We're excited to reward you for being an active Telegram user\\! 🚀\\. With our app, you'll earn fantastic rewards just by chatting, sharing, and exploring\\. 

Here's how it works:

*Stay Engaged*\\: Use Telegram as you normally would\\.
*Earn Points*\\: Accumulate points for your activity and interactions\\.
*Redeem Rewards*\\: Exchange your points for exclusive rewards and offers\\!`;

  // Check if the user exists in the database
  const { data, error } = await supabase
    .from("users")
    .select("u_id")
    .eq("u_id", msg.from.id)
    .maybeSingle();

  if (error) {
    bot.sendMessage(
      chatId,
      "Aw snap! 😢 Something went wrong. Please try again with the /start command."
    );
    return;
  }

  if (data) {
    // User already exists
    const welcomeBackMessage = `Welcome back to *Furthermore*\\! 🎉${
      firstName ? ` *${firstName}*` : ""
    }

We're glad to see you again\\. Ready to continue earning rewards?

Open the app to check your points and available rewards\\!`;

    bot.sendMessage(chatId, welcomeBackMessage, {
      parse_mode: "MarkdownV2",
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Open Furthermore App",
              web_app: {
                url: "https://further-more.vercel.app/",
              },
            },
          ],
        ],
      },
    });
  } else {
    // New user registration
    const { data: newUser, error: insertError } = await supabase
      .from("users")
      .insert({
        u_id: msg.from.id,
        username: msg.from?.username || null,
        firstname: msg.from?.first_name || null,
        type: msg.chat.type,
        is_bot: msg.from.is_bot,
        language_code: msg.from.language_code,
        is_premium: msg.from.is_premium || false,
        is_new: true,
      });

    if (insertError) {
      bot.sendMessage(
        chatId,
        "Aw snap! 😢 Something went wrong. Please try again with the /start command."
      );
      return;
    }

    // Insert referral info if applicable
    const { error: referralError } = await supabase.from("referral").insert({
      user_id: msg.from.id,
      refree: refCode || null,
      ref_count: 0,
    });

    if (refCode) {
      if (referralError) {
        bot.sendMessage(
          chatId,
          "Aw snap! 😢 Something went wrong with the referral. Please try again with the /start command."
        );
      } else {
        // Update referrer's referral count
        const { data: referrerData, _ } = await supabase
          .from("referral")
          .select("ref_count")
          .eq("user", refCode)
          .maybeSingle();

        if (
          referrerData &&
          referrerData.ref_count !== null &&
          referrerData.ref_count !== undefined
        ) {
          // Increment referrer's count
          const { error: updateError } = await supabase
            .from("referral")
            .update({ ref_count: referrerData.ref_count + 1 })
            .eq("user", refCode);

          if (updateError) {
            bot.sendMessage(
              chatId,
              "Aw snap! 😢 Something went wrong with updating the referral count."
            );
          }
        }
      }
    }

    bot
      .sendAnimation(
        chatId,
        "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExanB4YmJpM2w0NnByNWR1MHl4OWRicTNqY2F6MTdhN25hbG05eXJ5MCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/iwJMmqOiqzss0/giphy.gif",
        {
          caption: caption,
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "Launch Furthermore",
                  web_app: {
                    url: "https://further-more.vercel.app/",
                  },
                },
              ],
              [
                {
                  text: "Join Community",
                  url: "https://t.me/Loong_Telegram",
                },
              ],
            ],
          },
          parse_mode: "MarkdownV2",
        }
      )
      .catch((err) => {
        bot.sendMessage(
          chatId,
          "Aw snap! 😢 Something went wrong. Please try again with the /start command."
        );
      });
  }
};

bot.onText(/^\/start(?:\s+(.+))?$/, handleStartCommand);

bot.onText(/\/referral/, async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  const referralLink = `https://t.me/L_Test_101_bot?start=${userId}`;

  try {
    const { data, error } = await supabase
      .from("referral")
      .select("ref_count")
      .eq("user_id", userId)
      .single();

    if (error) {
      bot.sendMessage(
        chatId,
        "Oops! Something went wrong while fetching your referral information. Please try again later."
      );
      return;
    }

    const refCount = data.ref_count || 0;

    const message = `🎉 Here\\'s your referral link\\: [Click here to share](${referralLink})

Share it with your friends and earn rewards\\! 🎁

You've already referred ${refCount} friend${
      refCount !== 1 ? "s" : ""
    }\\. Keep it up\\! 🚀`;

    bot.sendMessage(chatId, message, { parse_mode: "MarkdownV2" });
  } catch (error) {
    bot.sendMessage(
      chatId,
      "Oops! Something went wrong. Please try again later."
    );
  }
});

bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;

  const text = `*Available commands:*

/help: Show this message.
/rewards: Check your current active time and rewards attached to your account!.
/start: Get me started and see how it works.
/referral: Get your referral link.

_Happy chatting!_`;

  bot.sendMessage(chatId, text, { parse_mode: "Markdown" });
});

bot.onText(/\/rewards/, async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  try {
    const { data, error } = await supabase
      .from("rewards")
      .select("time_spent")
      .eq("user_id", userId)
      .single();

    if (error || !data) {
      const text = `It looks like you haven't opened our app yet, so we don't have any rewards to show. Click on the button below to open the app and start tracking your progress!`;

      bot.sendMessage(chatId, text, {
        parse_mode: "Markdown",
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Launch Furthermore",
                web_app: {
                  url: "https://further-more.vercel.app/",
                },
              },
            ],
          ],
        },
      });
      return;
    }

    const timeSpentSeconds = data.time_spent || 0;
    const months = Math.floor(timeSpentSeconds / (30 * 24 * 60 * 60));
    const weeks = Math.floor(
      (timeSpentSeconds % (30 * 24 * 60 * 60)) / (7 * 24 * 60 * 60)
    );
    const days = Math.floor(
      (timeSpentSeconds % (7 * 24 * 60 * 60)) / (24 * 60 * 60)
    );
    const hours = Math.floor((timeSpentSeconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((timeSpentSeconds % (60 * 60)) / 60);
    const seconds = timeSpentSeconds % 60;

    const text = `Your total time spent:
${months} months, ${weeks} weeks, ${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds.

Keep up the great work!`;

    bot.sendMessage(chatId, text, { parse_mode: "Markdown" });
  } catch (error) {
    bot.sendMessage(
      chatId,
      "Oops! Something went wrong. Please try again later."
    );
  }
});

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const text = `Oops! 🤔 It looks like the command you entered isn't recognized.

_Please try one of the following commands:_
/help - Get a list of commands`;

  const helloText = `Hello there! 🤗

It looks like the command you entered isn’t recognized, but it's okay!

_Please try one of the following:_
/help: Get a list of commands and how to use them.`;

  if (
    msg.text.toLowerCase().startsWith("/start") ||
    msg.text.toLowerCase() === "/help" ||
    msg.text.toLowerCase() === "/rewards" ||
    msg.text.toLowerCase() === "/referral"
  ) {
    return;
  }
  if (msg.text.toLowerCase() === "hello") {
    bot.sendMessage(chatId, helloText, { parse_mode: "Markdown" });
    return;
  }

  bot.sendMessage(chatId, text, { parse_mode: "Markdown" });
});
