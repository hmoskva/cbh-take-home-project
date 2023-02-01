const crypto = require("crypto");

const performHash = (data) =>
  crypto.createHash("sha3-512").update(JSON.stringify(data)).digest("hex");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

  let candidate = event
    ? event.partitionKey || performHash(JSON.stringify(event))
    : TRIVIAL_PARTITION_KEY;

  if (typeof candidate !== "string") {
    candidate = JSON.stringify(candidate);
  }

  return candidate.length < MAX_PARTITION_KEY_LENGTH
    ? candidate
    : performHash(candidate);
};
