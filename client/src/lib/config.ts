export const DASHBOARD_URLS = [
  {
    id: 'salesflow-embed',
    url: 'https://aps.work/ssp',
    title: 'SalesFlow',
    loginUrl: 'https://aps.work/ssp',
    openInNewWindow: true
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
    id: 'job-backlog',
    url: '/api/quickbase-proxy/db/bn8xkcehm?a=q&qid=105',
    title: 'Job Backlog',
    loginUrl: 'https://americanpower.quickbase.com/db/bn8xkcehm?a=q&qid=105'
  },
  {
    id: 'links',
    url: '',
    title: 'Links',
    loginUrl: '',
    isLinksTab: true
  }
] as const;