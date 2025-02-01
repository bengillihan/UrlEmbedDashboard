export const DASHBOARD_URLS = [
  {
    id: 'sales',
    url: '/api/ssp-proxy',
    title: 'Salesflow'
  },
  {
    id: 'powerbi',
    url: 'https://app.powerbi.com/reportEmbed?reportId=db4665f9-bb0f-42ef-ac87-a0172e6573fb&autoAuth=true&ctid=4fa2dc50-679e-4e7f-9953-0b4a5c3291be',
    title: 'PowerBI'
  },
  {
    id: 'quickbase',
    url: 'https://americanpower.quickbase.com/db/bp5hq3uqm/813bccff-c7f4-4298-aa2d-aa36e57ea55e',
    title: 'QuickBase'
  },
  {
    id: 'test-salesflow',
    url: 'https://sales-dashboard-v-2-bdgillihan.replit.app',
    title: 'Test Salesflow'
  },
  {
    id: 'table-syncs',
    url: 'https://americanpower.quickbase.com/db/btqxmmkir/tablereport?a=td',
    title: 'Table Syncs'
  }
] as const;