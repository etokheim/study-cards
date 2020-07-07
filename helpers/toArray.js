export default function toArray(object) {
	return Object.keys(object).map((objectKey) => object[objectKey])
}
