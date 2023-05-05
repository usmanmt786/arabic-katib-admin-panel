import { google } from 'googleapis';
import { JWT } from 'google-auth-library';


export default async function handler(req,res) {
const privateKey=process.env.ANALYTICS_PRIVATE_KEY
const clientEmail=process.env.CLIENT_EMAIL
const propertyId=process.env.PROPERTY_ID
const {startDate}=req.body
const {endDate}=req.body
 const auth = new JWT({
  email: clientEmail,
  key: privateKey,
  scopes: ['https://www.googleapis.com/auth/analytics.readonly']
});

const analyticsdata = google.analyticsdata({
  version: 'v1beta',
  auth: auth
});

const response = await analyticsdata.properties.runReport({
  property: 'properties/'+propertyId,
  requestBody: {
    dimensions: [
      { name: 'pagePath' }
    ],dateRanges: [
      {
        startDate: startDate,
        endDate: endDate,
      },
    ],
    metrics: [
       { name: 'screenPageViews' },
{name:'activeUsers'}
        
       
    ]
  }
});
res.send(response.data.rows)
}



