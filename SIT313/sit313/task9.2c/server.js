const express = require("express");
const cors = require('cors');
const stripe = require("stripe")("sk_test_51QFszICTWRQuQJSBg99VkF27PCETYqOPRj4mfQM5krHFXU3d2mrmhul8flwGiWjtpe1AcOcRoRz7sCAZduWQLsSD00Ew1OiFR6");

const app = express();
app.use(cors()); 
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the subscription service API!");
});

app.post("/create-subscription", async (req, res) => {
    try {
      const customer = await stripe.customers.create({
        email: req.body.email,
        payment_method: req.body.stripeToken, 
        invoice_settings: {
          default_payment_method: req.body.stripeToken, 
        },
      });

      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ plan: req.body.plan }],
      });
  
      res.json({ subscription: {
            id: subscription.id,
            status: subscription.status,
            items: subscription.items.data,
        } 
    });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });

app.listen(4000, () => {
  console.log("Server running on port 4000");
});
