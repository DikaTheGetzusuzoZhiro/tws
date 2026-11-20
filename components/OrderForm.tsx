"use client";
import { useState } from "react";
import { supabase, supabaseReady } from "@/lib/supabase";
import { waLink } from "@/lib/config";

type RobloxUser = { id: number; name: string; displayName: string; avatar: string | null };
export default function OrderForm({ kind, itemId, itemName, price }: {kind:string;itemId:string;itemName:string;price:number}) {
 const [username,setUsername]=useState("");
 const [contact,setContact]=useState("");
 const [note,setNote]=useState("");
 const [sending,setSending]=useState(false);
 const [checking,setChecking]=useState(false);
 const [user,setUser]=useState<RobloxUser|null>(null);
 const [lookupError,setLookupError]=useState("");
 const [done,setDone]=useState("");
 const [showQr,setShowQr]=useState(false);

 async function checkUsername(){
   if(!username.trim()){setLookupError("Masukkan username Roblox terlebih dahulu.");return;}
   setChecking(true);setLookupError("");setUser(null);
   try{
     const response=await fetch(`/api/roblox-user/${encodeURIComponent(username.trim())}`);
     const data=await response.json();
     if(!response.ok) throw new Error(data.error || "Username tidak ditemukan.");
     setUser(data);
     setUsername(data.name);
   }catch(error){setLookupError(error instanceof Error?error.message:"Gagal memeriksa username.");}
   finally{setChecking(false);}
 }
 async function submit(e:React.FormEvent){
   e.preventDefault();
   if(!user){setLookupError("Periksa username Roblox terlebih dahulu.");return;}
   if(!contact.trim())return alert("Lengkapi nomor WhatsApp.");
   setSending(true);
   const payload={kind,item_id:itemId,item_name:itemName,price,username:user.name,customer_contact:contact.trim(),note:note.trim(),status:"waiting_payment"};
   let orderCode="DEMO-"+Date.now().toString().slice(-6);
   if(supabaseReady){
     const {data,error}=await supabase.from("orders").insert(payload).select("order_code").single();
     if(error){alert("Pesanan belum tersimpan: "+error.message);setSending(false);return;}
     orderCode=data.order_code;
   }
   setDone(orderCode);
   setShowQr(true);
   setSending(false);
 }
 function confirmPayment(){
   const msg=`Halo Tama Store, saya sudah membuat pesanan dan akan melakukan pembayaran QRIS.\nKode: ${done}\nProduk: ${itemName}\nHarga: Rp${price.toLocaleString("id-ID")}\nUsername Roblox: ${user?.name}\nKontak: ${contact}\nCatatan: ${note || "-"}`;
   window.open(waLink(msg),"_blank","noopener,noreferrer");
 }
 return <form className="order-form" onSubmit={submit}>
   <label>Username Roblox
     <div className="username-check">
       <input value={username} onChange={e=>{setUsername(e.target.value);setUser(null);setShowQr(false);}} required placeholder="Masukkan username Roblox"/>
       <button type="button" className="button button-ghost" onClick={checkUsername} disabled={checking}>{checking?"Mengecek...":"Cek Username"}</button>
     </div>
   </label>
   {user&&<div className="roblox-user"><img src={user.avatar || "/favicon.svg"} alt={`Avatar ${user.name}`}/><div><b>{user.displayName}</b><span>@{user.name} · ID {user.id}</span><small>Username ditemukan</small></div></div>}
   {lookupError&&<p className="error">{lookupError}</p>}
   <label>Nomor WhatsApp aktif<input value={contact} onChange={e=>setContact(e.target.value)} required placeholder="08xxxxxxxxxx"/></label>
   <label>Catatan (opsional)<textarea value={note} onChange={e=>setNote(e.target.value)} placeholder="Catatan pesanan"/></label>
   <button className="button button-primary full" disabled={sending||!user}>{sending?"Memproses...":"Lanjut ke Pembayaran"}</button>
   {showQr&&<div className="payment-box">
     <h3>Scan QRIS untuk Membayar</h3>
     <p>Pastikan nominal pembayaran sesuai total pesanan.</p>
     <img className="qris-image" src="/images/tama-store-qris.png" alt="QRIS pembayaran TAMA STORE 2, GAMING"/>
     <strong>Rp{price.toLocaleString("id-ID")}</strong>
     <p>Kode pesanan: <b>{done}</b></p>
     <button type="button" className="button button-primary full" onClick={confirmPayment}>Konfirmasi Pembayaran via WhatsApp</button>
   </div>}
   <small>Pastikan username Roblox yang tampil sudah benar sebelum melanjutkan.</small>
 </form>;
}
