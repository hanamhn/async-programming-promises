import setText , {appendText} from './results.mjs';

export async function get() {
  const { data } = await axios.get("http://localhost:3000/orders/1");
  setText(JSON.stringify(data));
}

export async function getCatch() {
 
  try {
     const { data } = await axios.get("http://localhost:3000/orders/123");
  setText(JSON.stringify(data));
  } catch (error) {
    setText(error);
  }
}

export function chain() {
  axios.get("http://localhost:3000/orders/1")
    .then(({ data }) => {
      return axios.get(`http://localhost:3000/addresses/${data.shippingAddress}`);
    })
    .then(({ data }) => {
      setText(`City: ${data.city}`);
    });
}

export async function concurrent(){
  const orderStatus = axios.get("http://localhost:3000/orderStatuses");
  const orders = axios.get("http://localhost:3000/orders");

  setText("");

  const { data: statuses } = await orderStatus;
  const { data: order } = await orders;
  
  appendText(JSON.stringify(statuses));
  appendText(JSON.stringify(order[0]))


}

export async function parallel() {
  setText("");

  await Promise.all([
    (async () => {
      const { data } = await axios.get("http://localhost:3000/orderStatuses");
      appendText(JSON.stringify(data));
    })(),
    (async () => {
      const { data } = await axios.get("http://localhost:3000/orders");
      appendText(JSON.stringify(data));
    })(),
    (async () => {
      const { data } = await axios.get("http://localhost:3000/orders/123");
      appendText(JSON.stringify(data));
    })(),
  ]);
}