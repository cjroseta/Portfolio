# Arquitectura Scala Content Manager API

```mermaid
flowchart LR
  SCALA[Scala Content Manager] --> API[REST API]
  API --> ODOO[Odoo]
  ODOO --> BI[Business Intelligence]
  BI --> REPORTS[Relatórios de veiculação e executivos]
```

A integração centraliza campanhas, ocupação de painéis e ciclo de vida operacional no Odoo. A camada de BI transforma esses dados em indicadores e relatórios para equipas operacionais, clientes e gestão.
