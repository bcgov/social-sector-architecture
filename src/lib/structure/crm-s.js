// Diagram structure for SaaS CRM S: where each zone sits and which parts it holds.
// The words live in ../content/crm-s.yaml.
export default {
  "id": "s",
  "slug": "crm-s",
  "hue": "river",
  "layout": {
    "columns": "2.2fr 1fr 1fr",
    "areas": [
      "\"people people .\"",
      "\"crm integration counterparties\"",
      "\"ministry ministry ministry\""
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
      "id": "crm",
      "tone": "crm",
      "shape": "box",
      "groups": [
        {
          "id": "experience",
          "parts": [
            "console",
            "portals",
            "field-service"
          ]
        },
        {
          "id": "case-work-one-package-per-program-family",
          "parts": [
            "adult",
            "child-protection",
            "adoption",
            "support-needs",
            "conditional-four"
          ]
        },
        {
          "id": "shared-services",
          "parts": [
            "evidence",
            "rules",
            "clocks",
            "access",
            "notices",
            "payments",
            "platform-services"
          ]
        }
      ]
    },
    {
      "id": "integration",
      "tone": "integration",
      "shape": "box",
      "groups": [
        {
          "id": "main",
          "parts": [
            "integration-hub",
            "siebel-connector"
          ]
        }
      ]
    },
    {
      "id": "counterparties",
      "tone": "people",
      "shape": "box",
      "groups": [
        {
          "id": "main",
          "parts": [
            "finance",
            "government"
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
          "id": "main",
          "parts": [
            "reporting-store",
            "continuity-store",
            "manual-payment",
            "siebel"
          ]
        }
      ]
    }
  ]
};
