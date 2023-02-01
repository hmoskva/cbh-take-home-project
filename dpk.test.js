const { deterministicPartitionKey } = require("./dpk");

const { createHash } = require("crypto");

const mockDigest = jest.fn((x) => "123");

jest.mock("crypto", () => ({
  createHash: jest.fn(),
}));

describe("deterministicPartitionKey", () => {
  beforeEach(() => {
    createHash.mockReturnValue({
      update: jest.fn().mockReturnThis(),
      digest: mockDigest,
    });
  });

  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Should return the partition key if it exists", () => {
    const event = { partitionKey: "abc" };
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe("abc");
  });

  it("should return the SHA3-512 hash of the stringified event data if partitionKey is not present", () => {
    const event = { data: "event data" };
    const result = deterministicPartitionKey(event);
    expect(result).toBe("123");
  });

  it("should return a SHA3-512 hash of the stringified event data if partitionKey is not a string", () => {
    const event = { partitionKey: 123 };
    const result = deterministicPartitionKey(event);
    expect(result.length).toBe(3);
  });

  it("Should use the SHA3-512 algorithm for hashing if the partition key is not present in the event data", () => {
    const event = { id: "123" };
    deterministicPartitionKey(event);
    expect(createHash).toHaveBeenCalled();
    expect(createHash).toHaveBeenCalledWith(expect.stringMatching(/sha3-512/i));
  });
});
