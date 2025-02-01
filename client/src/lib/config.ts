export const DASHBOARD_URLS = [
  {
    id: 'sales',
    url: '/api/salesflow-proxy/',
    title: 'Salesflow',
    loginUrl: 'https://sales-service-portal-bdgillihan.replit.app/'
  },
  {
    id: 'powerbi',
    url: '/api/powerbi-proxy/reportEmbed',
    title: 'PowerBI',
    loginUrl: 'https://app.powerbi.com/reportEmbed?reportId=db4665f9-bb0f-42ef-ac87-a0172e6573fb&autoAuth=true&ctid=4fa2dc50-679e-4e7f-9953-0b4a5c3291be'
  },
  {
    id: 'quickbase',
    url: '/api/quickbase-proxy/db/bp5hq3uqm/813bccff-c7f4-4298-aa2d-aa36e57ea55e',
    title: 'QuickBase',
    loginUrl: 'https://americanpower.quickbase.com/db/bp5hq3uqm/813bccff-c7f4-4298-aa2d-aa36e57ea55e'
  },
  {
    id: 'test-salesflow',
    url: '/api/salesflow-proxy/',
    title: 'Test Salesflow',
    loginUrl: 'https://sales-dashboard-v-2-bdgillihan.replit.app'
  },
  {
    id: 'table-syncs',
    url: '/api/quickbase-proxy/db/btqxmmkir/tablereport?a=td',
    title: 'Table Syncs',
    loginUrl: 'https://americanpower.quickbase.com/db/btqxmmkir/tablereport?a=td'
  }
] as const;