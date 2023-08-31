const mongoose = require("mongoose");

const ImportantLinksSchema = new mongoose.Schema({
  social: {
    facebook: {
      type: String,
      required: [true, "Please enter the facebook related link !"],
    },
    telegram: {
      type: String,
      required: [true, "Please enter the telegram related link !"],
    },
    twitter: {
      type: String,
      required: [true, "Please enter the twitter related link !"],
    },
    tiktok: {
      type: String,
      required: [true, "Please enter the tiktok related link !"],
    },
    discord: {
      type: String,
      required: [true, "Please enter the discord related link !"],
    },
  },
  domains: {
    type: String,
    required: [true, "Please enter the domain u want!"],
  },
  payment: {
    bitcoinAddress: {
      type: String,
      required: [true, "Please enter the bitcoin wallet Address!"],
    },

    ethereumAddress: {
      type: String,
      required: [true, "Please enter the ethereum wallet Address!"],
    },

    payByCardURL: {
      type: String,
      required: [true, "Please enter the card payment gateaway Address!"],
    },
    stripe: {
      type: String,
      required: [true, "Please enter the Stripe wallet Address!"],
    },

    paypal: {
      type: String,
      required: [true, "Please enter the paypal wallet Address!"],
    },
  },
  giveaway: {
    giveawayRetweet: {
      type: String,
      required: [true, "Please enter the giveaway retweet Address!"],
    },
    giveawayTwitterFollow: {
      type: String,
      required: [true, "Please enter the giveaway twitter follow Address!"],
    },
    giveawayTelegram: {
      type: String,
      required: [true, "Please enter the giveaway twitter follow Address!"],
    },
  },
  contactUS: {
    email: {
      type: String,
      required: [true, "please enter the website business email!"],
    },
    telephone: {
      type: String,
      required: [true, "please enter the website business phone number!"],
    },
    address: {
      type: String,
      required: [true, "please enter the website business phone number!"],
    },
  },
  protectedBadge: {
    type: String,
    required: [true, "please enter the webiste protected badge address!"],
  },
  banners: {
    casino: {
      type: String,
      required: [true, "please enter casino banner link!"],
    },
    vpn: {
      type: String,
      required: [true, "please enter vpn banner link!"],
    },
  },
});
const ImportantLinks = mongoose.model("ImportantLinks", ImportantLinksSchema);

module.exports = ImportantLinks;
