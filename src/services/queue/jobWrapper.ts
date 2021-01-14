export default class JobWrapper {
  static wrap(proxy: any) {
    return {
      perform: async (...args: []) => {
        console.log(`args: ${args}`);
        return await proxy.perform.apply(proxy, args)
      }
    }
  }
}