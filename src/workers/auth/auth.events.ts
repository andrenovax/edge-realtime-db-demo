// Auth owns the identity lifecycle events it emits. Consumers import these
// types without taking a dependency on Auth's implementation.
export type UserCreatedV1 = {
  type: "user.created";
  version: 1;
  user: {
    id: string;
    email: string;
    name: string;
    createdAt: string;
  };
};
