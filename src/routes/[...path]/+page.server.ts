// import B2Client from '$lib/server/b2';

import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import type { PageServerLoad } from './$types';

import {
	B2_BUCKET,
	B2_REGION,
	B2_APPLICATION_KEY_ID,
	B2_APPLICATION_KEY
} from '$env/static/private';

// const b2 = new B2Client({
// 	applicationKeyId: B2_APPLICATION_KEY_ID,
// 	applicationKey: B2_APPLICATION_KEY
// });

const s3 = new S3Client({
	endpoint: `https://s3.${B2_REGION}.backblazeb2.com`,
	region: B2_REGION,
	credentials: {
		accessKeyId: B2_APPLICATION_KEY_ID,
		secretAccessKey: B2_APPLICATION_KEY
	}
});

export const load: PageServerLoad = async ({ params }) => {
	const response = await s3.send(new ListObjectsV2Command({
		Bucket: B2_BUCKET,
	}));

	return { s3Response: response};
};
