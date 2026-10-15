// Diagram structure for Salesforce H: where each zone sits and which parts it holds.
// The words live in ../content/salesforce-h.yaml.
export default {
  "id": "h",
  "slug": "salesforce-h",
  "hue": "moss",
  "layout": {
    "columns": "1.15fr 0.8fr 1.6fr",
    "areas": [
      "\"people people finance\"",
      "\"salesforce mulesoft ministry\"",
      "\"government government government\""
    ]
  },
  "zones": [
    {
      "id": "people",
      "tone": "people",
      "shape": "box",
      "groups": [
        {
          "id": "main",
          "parts": [
            "workers",
            "clients",
            "partners"
          ]
        }
      ]
    },
    {
      "id": "finance",
      "tone": "people",
      "shape": "box",
      "groups": [
        {
          "id": "main",
          "parts": [
            "finance"
          ]
        }
      ]
    },
    {
      "id": "salesforce",
      "tone": "salesforce",
      "shape": "box",
      "groups": [
        {
          "id": "experience",
          "parts": [
            "console",
            "portals"
          ]
        },
        {
          "id": "case-work",
          "parts": [
            "case-work"
          ]
        },
        {
          "id": "services-in-salesforce",
          "parts": [
            "rules",
            "notices",
            "platform-services"
          ]
        }
      ]
    },
    {
      "id": "mulesoft",
      "tone": "mulesoft",
      "shape": "box",
      "groups": [
        {
          "id": "main",
          "parts": [
            "open-host",
            "change-relay",
            "secure-exchange"
          ]
        }
      ]
    },
    {
      "id": "ministry",
      "tone": "ministry",
      "shape": "box",
      "groups": [
        {
          "id": "money",
          "parts": [
            "financial-components",
            "ledger",
            "payments"
          ]
        },
        {
          "id": "decisions-and-evidence",
          "parts": [
            "decision-store",
            "rules-archive",
            "drift-check",
            "evidence-store"
          ]
        },
        {
          "id": "events-and-backup",
          "parts": [
            "kafka",
            "continuity-copy",
            "fallback-apps",
            "lakehouse",
            "reporting-line"
          ]
        }
      ]
    },
    {
      "id": "government",
      "tone": "people",
      "shape": "box",
      "groups": [
        {
          "id": "main",
          "parts": [
            "government"
          ]
        }
      ]
    }
  ]
};
