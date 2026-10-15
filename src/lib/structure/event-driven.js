// Diagram structure for Event-driven: where each zone sits and which parts it holds.
// The words live in ../content/event-driven.yaml.
export default {
  "id": "e",
  "slug": "event-driven",
  "hue": "cedar",
  "layout": {
    "columns": "minmax(9rem,0.6fr) 1.15fr 1fr",
    "areas": [
      "\". experience experience\"",
      "\". api api\"",
      "\"gateways domain intelligence\"",
      "\"gateways domain events\"",
      "\". commodity commodity\""
    ]
  },
  "zones": [
    {
      "id": "experience",
      "tone": "experience",
      "shape": "box",
      "groups": [
        {
          "id": "main",
          "parts": [
            "worker-context",
            "client-context",
            "applicant-context",
            "vendor-context"
          ]
        }
      ]
    },
    {
      "id": "api",
      "tone": "api",
      "shape": "box",
      "groups": [
        {
          "id": "main",
          "parts": [
            "service-layer"
          ]
        }
      ]
    },
    {
      "id": "domain",
      "tone": "domain",
      "shape": "box",
      "groups": [
        {
          "id": "main",
          "parts": [
            "participant-identity",
            "financial-components",
            "service-delivery",
            "provider-outcome",
            "evidence-verification"
          ]
        }
      ]
    },
    {
      "id": "intelligence",
      "tone": "intelligence",
      "shape": "box",
      "groups": [
        {
          "id": "main",
          "parts": [
            "rules-engine",
            "orchestration",
            "intelligence"
          ]
        }
      ]
    },
    {
      "id": "events",
      "tone": "events",
      "shape": "box",
      "groups": [
        {
          "id": "main",
          "parts": [
            "event-broker"
          ]
        }
      ]
    },
    {
      "id": "commodity",
      "tone": "commodity",
      "shape": "box",
      "groups": [
        {
          "id": "main",
          "parts": [
            "client-identity",
            "notifications",
            "documents",
            "chat-bots",
            "printing",
            "verified-credentials",
            "document-scanning",
            "speech",
            "call-centre",
            "payment-processing",
            "user-analytics",
            "reporting",
            "health-monitoring",
            "policy-governance",
            "auth"
          ]
        }
      ]
    },
    {
      "id": "gateways",
      "tone": "people",
      "shape": "circle",
      "groups": [
        {
          "id": "main",
          "parts": [
            "data-gateway",
            "icm-api"
          ]
        }
      ]
    }
  ]
};
