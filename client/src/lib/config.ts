export const DASHBOARD_URLS = [
  {
    id: 'salesflow-embed',
    url: 'https://sales-service-portal-bdgillihan.replit.app/',
    title: 'SalesFlow Embed',
    loginUrl: 'https://sales-service-portal-bdgillihan.replit.app/'
  },
  {
    id: 'powerbi-embed',
    url: 'https://app.powerbi.com/reportEmbed?reportId=db4665f9-bb0f-42ef-ac87-a0172e6573fb&autoAuth=true&ctid=4fa2dc50-679e-4e7f-9953-0b4a5c3291be',
    title: 'PowerBI',
    loginUrl: 'https://app.powerbi.com',
    embedConfig: {
      reportId: 'db4665f9-bb0f-42ef-ac87-a0172e6573fb',
      embedUrl: 'https://app.powerbi.com/reportEmbed',
      autoAuth: true,
      ctid: '4fa2dc50-679e-4e7f-9953-0b4a5c3291be'
    }
  },
  {
    id: 'quickbase',
    url: '/api/quickbase-proxy/db/bp5hq3uqm/813bccff-c7f4-4298-aa2d-aa36e57ea55e',
    title: 'QuickBase',
    loginUrl: 'https://americanpower.quickbase.com/db/bp5hq3uqm/813bccff-c7f4-4298-aa2d-aa36e57ea55e'
  },
  {
    id: 'table-syncs',
    url: '/api/quickbase-proxy/db/btqxmmkir/tablereport?a=q&qid=1',
    title: 'Table Syncs',
    loginUrl: 'https://americanpower.quickbase.com/db/btqxmmkir/tablereport?a=q&qid=1'
  },
  {
    id: 'product-backlog',
    url: '/api/quickbase-proxy/db/bn8ezvb9v?a=q&qid=90',
    title: 'Product Backlog',
    loginUrl: 'https://americanpower.quickbase.com/db/bn8ezvb9v?a=q&qid=90'
  },
  {
    id: 'salesflow-dev',
    url: 'https://22762c29-3853-49fd-8fab-68c62fe53f01-00-ne1gi181pknk.kirk.replit.dev/dashboard',
    title: 'SalesFlow Dev',
    loginUrl: 'https://22762c29-3853-49fd-8fab-68c62fe53f01-00-ne1gi181pknk.kirk.replit.dev/dashboard'
  },
  {
    id: 'salesflow-pop',
    url: '/api/ssp-proxy/',
    title: 'SalesFlow Pop',
    loginUrl: 'https://aps.work/ssp',
    openInNewWindow: true
  },
  {
    id: 'links',
    url: '',
    title: 'Links',
    loginUrl: '',
    isLinksTab: true
  }
] as const;