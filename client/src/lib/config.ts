export const DASHBOARD_URLS = [
  {
    id: 'sales',
    url: '/api/ssp-proxy/',
    title: 'Salesflow',
    loginUrl: 'https://aps.work/ssp',
    openInNewWindow: true
  },
  {
    id: 'powerbi',
    url: '/api/powerbi-proxy/reportEmbed?reportId=db4665f9-bb0f-42ef-ac87-a0172e6573fb&autoAuth=true&ctid=4fa2dc50-679e-4e7f-9953-0b4a5c3291be',
    title: 'PowerBI',
    loginUrl: 'https://app.powerbi.com/reportEmbed?reportId=db4665f9-bb0f-42ef-ac87-a0172e6573fb&autoAuth=true&ctid=4fa2dc50-679e-4e7f-9953-0b4a5c3291be'
  },
  {
    id: 'powerbi-full',
    url: 'https://app.powerbi.com/groups/62f11417-9444-43af-b88e-1e48c1ff3ff5/reports/db4665f9-bb0f-42ef-ac87-a0172e6573fb/500c1df4554eed48d7b2?experience=power-bi',
    title: 'PowerBI Full Test',
    loginUrl: 'https://app.powerbi.com/groups/62f11417-9444-43af-b88e-1e48c1ff3ff5/reports/db4665f9-bb0f-42ef-ac87-a0172e6573fb/500c1df4554eed48d7b2?experience=power-bi'
  },
  {
    id: 'powerbi-embed',
    url: '/api/powerbi-proxy/reportEmbed',
    title: 'Embed PowerBI Test',
    loginUrl: 'https://app.powerbi.com/reportEmbed',
    embedConfig: {
      reportId: 'db4665f9-bb0f-42ef-ac87-a0172e6573fb',
      embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=db4665f9-bb0f-42ef-ac87-a0172e6573fb&autoAuth=true&ctid=4fa2dc50-679e-4e7f-9953-0b4a5c3291be',
      tokenType: 'Embed'
    }
  },
  {
    id: 'quickbase',
    url: '/api/quickbase-proxy/db/bp5hq3uqm/813bccff-c7f4-4298-aa2d-aa36e57ea55e',
    title: 'QuickBase',
    loginUrl: 'https://americanpower.quickbase.com/db/bp5hq3uqm/813bccff-c7f4-4298-aa2d-aa36e57ea55e'
  },
  {
    id: 'ssp-embed',
    url: 'https://sales-service-portal-embed-bdgillihan.replit.app/dashboard',
    title: 'SSP Embed Test',
    loginUrl: 'https://sales-service-portal-embed-bdgillihan.replit.app/dashboard'
  },
  {
    id: 'ssp-direct',
    url: 'https://sales-service-portal-bdgillihan.replit.app/dashboard',
    title: 'SSP Direct Test',
    loginUrl: 'https://sales-service-portal-bdgillihan.replit.app/dashboard'
  },
  {
    id: 'table-syncs',
    url: '/api/quickbase-proxy/db/btqxmmkir/tablereport?a=td',
    title: 'Table Syncs',
    loginUrl: 'https://americanpower.quickbase.com/db/btqxmmkir/tablereport?a=td'
  }
] as const;