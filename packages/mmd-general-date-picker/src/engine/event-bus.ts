class EventBus {
  private listeners: Array<{ event: string; callback: (data: unknown) => unknown }> = [];

  on<T = unknown>(event: string, callback: (data: T) => unknown) {
    this.listeners.push({ event, callback: callback as (data: unknown) => unknown });
  }

  emit(event: string, data: unknown) {
    this.listeners.forEach((listener) => {
      if (listener.event === event) listener.callback(data);
    });
  }
}

const eventBus = new EventBus();

export default eventBus;
