import { services } from "@/lib/config";
import OrderForm from "@/components/OrderForm";

export default function ServiceCard({ item }: { item: typeof services[number] }) {
  return <article className="service-card">
    <div className="service-top"><span className="service-icon">✦</span><span className="tag">LAYANAN</span></div>
    <h3>{item.title}</h3><p>{item.desc}</p>
    <strong className="price">Rp{item.price.toLocaleString("id-ID")}</strong>
    <OrderForm kind="service" itemId={item.id} itemName={item.title} price={item.price}/>
  </article>;
}