const dialogflow = require("dialogflow");
const sessionClient = new dialogflow.SessionsClient();

async function recoverAccount(req, res) {
  const sessionPath = sessionClient.sessionPath(
    "your-project-id",
    "your-session-id"
  );
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: req.body.message,
        languageCode: "en-US",
      },
    },
  };

  const responses = await sessionClient.detectIntent(request);
  const result = responses[0].queryResult;

  if (result.intent.displayName === "Recover Account") {
    const username = result.parameters.fields.username.stringValue;
    const email = result.parameters.fields.email.stringValue;

    // Check if account exists and email matches
    if (checkAccount(username, email)) {
      // Send recovery email (implement email sending functionality)
      res.send("Recovery email sent!");
    } else {
      res.send("Invalid username or email.");
    }
  } else {
    res.send(result.fulfillmentText);
  }
}

function checkAccount(username, email) {
  // Implement account checking logic here
  // Return true if account exists and email matches, false otherwise
}

// Start server
const express = require("express");
const app = express();
app.post("/recover", recoverAccount);
app.listen(3000, () => console.log("Server listening on port 3000"));
