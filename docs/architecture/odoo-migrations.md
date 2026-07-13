# Arquitectura de Migrações Odoo

```mermaid
flowchart LR
  V15[Odoo 15] --> V16[Odoo 16]
  V16 --> V17[Odoo 17]
  V17 --> STAGING[Staging e validação funcional]
  STAGING --> V18[Odoo 18 em Odoo SH]
  V18 --> V19[Preparação para Odoo 19]
```

Cada evolução exige auditoria dos módulos customizados, validação de dependências, testes funcionais por área de negócio e plano de rollback. Odoo SH fornece o fluxo de branches, build, staging e promoção para produção.
