const mp = require("mercadopago");
const uniqid = require("uniqid");
const StoreItem = require("../models/StoreItem");
const User = require("../models/User");
const mpCtrl = {};

mp.configure({
  sandbox: true,
  access_token: `${process.env.MPTOKEN}`,
});

const getFullUrl = (req) => {
  // const url = req.protocol + '://' + req.get('host');
  const url = "https://" + req.get("host");
  // console.log(url)
  return url;
};

mpCtrl.createPreference = async (req, res) => {
  const external_reference = uniqid("XeonMine");
  const { item } = req.body;
  const user = req.user;
  const items = item.map((e) => {
    return {
      title: e.name,
      description: e.description,
      quantity: e.quantity || 1,
      currency_id: "ARS",
      unit_price: parseFloat(e.price),
    };
  });

  const preference = {
    items,
    payer: {
      name: `${user.name} ${user.lastName}`,
      email: user.email,
    },
    external_reference,
    statement_descriptor: "XeonMine Server",
    payment_methods: {
      excluded_payment_types: [
        // {
        //   id: 'ticket'
        // },
        {
          id: "atm",
        },
      ],
    },
    notification_url: `${getFullUrl(req)}/postfeedback`,
    auto_return: "all",
    back_urls: {
      success: `${getFullUrl(req)}/feedback`,
      pending: `${getFullUrl(req)}/feedback`,
      failure: `${getFullUrl(req)}/feedback`,
    },
  };
  try {
    const response = await mp.preferences.create(preference);
    res.json({
      link_pay: response.body.init_point,
      external_reference,
    });
  } catch (error) {
    res.json(error);
  }
};

mpCtrl.notificacionWH = async (req, res) => {
  if (req.method == "POST") {
    res.status(200).send("ok");
    if (req.body.data) {
      const id = req.body.data.id;
      try {
        const data = await mp.payment.get(id);
        const external_reference = data.response.external_reference;
        const status = data.response.status;

        if (status == 'approved') {
          
        }
        if (status == 'in_process') {
          
        }
        if (status == 'rejected') {
          
        }
      } catch (error) {
        console.log(error);
        res.status(500).send('internal server error');
      }
    }
  }
};

module.exports = mpCtrl;
