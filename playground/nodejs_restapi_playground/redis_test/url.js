const command = {
  method: "GET",
  url: "http://localhost:3008/redis/set",
  params: {
    key: "foo",
    value: "bar",
  },
};

const json = JSON.stringify(command);

console.log(json);
