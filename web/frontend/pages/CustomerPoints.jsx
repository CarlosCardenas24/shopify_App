import { React, useEffect, useState } from 'react'
import { useAuthenticatedFetch } from '../hooks/useAuthenticatedFetch' 
import {
  Page,
  Layout,
  LegacyCard,
  Button,
  Text,
  DataTable
} from '@shopify/polaris'
/* import Counters from '../components/Counters' */


function MyComponent() {
  const [QRcodes, setQRcodes] = useState([])

  const fetch = useAuthenticatedFetch()

  useEffect(() => {

    const fetchCodes = async () => {
      const method = 'GET'

      const response = await fetch('/api/qrcodes', {
      method,
      headers: {
        'Content-Type': 'application/json'
      }
      })

      const data = await response.json()

      setQRcodes(data)
        
    }

    fetchCodes()
  })

  return (
    <Page
      backAction={{content: 'Settings', url: '/#'}}
      title='QR Code Points'
    >
      <Layout>
        <Layout.Section>
          <LegacyCard title='Add loyalty points' sectioned>
            <Text variant="headingMd" as="p">
              Test Text
            </Text>
          </LegacyCard>

          <LegacyCard title='QR Codes' sectioned>
            {
              QRcodes.length === 0 ?
              <Text variant="headingMd" as="p">
              There are no QR codes
              </Text>
              :
              <DataTable
              columnContentTypes={['text', 'text']}
              headings={['QR Codes', 'Add/Remove Points']}
              rows={QRcodes.map((qrCodes) => {
                  return [qrCodes.title, qrCodes.id]
              })} 
              />

            }
          </LegacyCard>
        </Layout.Section>
      </Layout>
    </Page>
  )

}

export default MyComponent