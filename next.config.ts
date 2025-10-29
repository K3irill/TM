/** @type {import('next').NextConfig} */
const nextConfig = {
	typescript: {
		// !! ВНИМАНИЕ !!
		// Опасность: игнорирует все TypeScript ошибки
		ignoreBuildErrors: true,
	},
}

module.exports = nextConfig
