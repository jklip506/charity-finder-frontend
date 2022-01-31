const spacesUrl = 'https://eku28o3vwk.execute-api.us-east-1.amazonaws.com/prod/';

export const config = {
    REGION: 'us-east-1',
    USER_POOL_ID: 'us-east-1_WV2p2LZ2Z',
    APP_CLIENT_ID: '46tns7k9bhh1gm2u4q99rdmptt',
    IDENTITY_POOL_ID: 'us-east-1:f160c9e7-4ee9-4d80-b78b-15c6d596aab4',
    TEST_USER_NAME: 'jasonktest',
    TEST_USER_PASSWORD: 'Tracker10!',
    SPACES_PHOTOS_BUCKET: 'spaces-photos0e1958115f53',
    api: {
        baseUrl: spacesUrl,
        spacesUrl: `${spacesUrl}spaces`
    }
} 