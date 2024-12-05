// removing the import of InstanceToken was deprecated from new @nestjs/core versions
// https://claude.ai/chat/9e150228-113b-45fd-934d-f0ae03f21590

// replace InstanceToken with a more flexible type
export type InstanceToken = string | symbol | Function;
