import{S as W,i as F,s as D,k as P,a as h,q as A,l as U,m as G,c as E,r as R,h as _,n as B,b as C,E as c,L as x,I as w,Q as z}from"../chunks/index.fce9d48b.js";//! --------- exports -------------
let Y={compute:L};//! -------------------------------
const k=1e3;async function L(l,...e){if(!navigator.gpu)throw Error("WebGPU not supported.");const o=await navigator.gpu.requestAdapter({powerPreference:"high-performance"});if(!o)throw Error("Couldn't request WebGPU adapter.");o.isFallbackAdapter&&console.warn("WebGPU is using a fallback adapter!");const a=await o.requestDevice(),i=a.createShaderModule({code:l}),n=a.createComputePipeline({layout:"auto",compute:{module:i,entryPoint:"main"}}),p=e.map(f=>a.createBuffer({size:f.size||k,usage:f.usage})),m=a.createBindGroup({layout:n.getBindGroupLayout(0),entries:p.map((f,d)=>({binding:d,resource:{buffer:f}}))}),s=a.createCommandEncoder(),t=s.beginComputePass();t.setPipeline(n),t.setBindGroup(0,m),t.dispatchWorkgroups(Math.ceil(k/64)),t.end(),a.queue.submit([s.finish()])}let I=Z,N=$;const g=1e3,q=`
@group(0) @binding(0) var<storage, read_write> output: array<f32>;
@group(0) @binding(1) var<storage, read_write> output2: array<f32>;

@compute @workgroup_size(64)
fn main(
  @builtin(global_invocation_id)
  global_id : vec3u,

  @builtin(local_invocation_id)
  local_id : vec3u,
) {
  // Avoid accessing the buffer out of bounds
  if (global_id.x >= ${g}) {
    return;
  }

  output[global_id.x] =
    f32(global_id.x) * 1000. + f32(local_id.x);

  output2[global_id.x] = f32(global_id.x);
}
`;async function $(){Y.compute(q,{usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC},{usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC},{usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST})}async function Z(){if(!navigator.gpu)throw Error("WebGPU not supported.");const l=await navigator.gpu.requestAdapter({powerPreference:"high-performance"});if(!l)throw Error("Couldn't request WebGPU adapter.");l.isFallbackAdapter&&console.warn("WebGPU is using a fallback adapter!");const e=await l.requestDevice(),o=e.createShaderModule({code:q}),a=e.createBuffer({size:g,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC}),i=e.createBuffer({size:g,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC}),n=e.createBuffer({size:g,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),p=e.createComputePipeline({layout:"auto",compute:{module:o,entryPoint:"main"}}),m=e.createBindGroup({layout:p.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:a}},{binding:1,resource:{buffer:i}}]}),s=e.createCommandEncoder(),t=s.beginComputePass();t.setPipeline(p),t.setBindGroup(0,m),t.dispatchWorkgroups(Math.ceil(g/64)),t.end(),s.copyBufferToBuffer(a,0,n,0,g),e.queue.submit([s.finish()]),await n.mapAsync(GPUMapMode.READ,0,g);const d=n.getMappedRange(0,g).slice(0);n.unmap(),console.log(new Float32Array(d))}function Q(l){let e,o,a,i,n,p,m,s,t,f,d,b,y,v,S;return{c(){e=P("form"),o=P("input"),a=h(),i=P("label"),n=A("Enable option one"),p=h(),m=P("br"),s=h(),t=P("button"),f=A("Run ml_init"),d=h(),b=P("button"),y=A("Run ml_test"),this.h()},l(u){e=U(u,"FORM",{id:!0});var r=G(e);o=U(r,"INPUT",{type:!0,id:!0}),a=E(r),i=U(r,"LABEL",{for:!0});var M=G(i);n=R(M,"Enable option one"),M.forEach(_),p=E(r),m=U(r,"BR",{}),s=E(r),t=U(r,"BUTTON",{type:!0});var O=G(t);f=R(O,"Run ml_init"),O.forEach(_),r.forEach(_),d=E(u),b=U(u,"BUTTON",{});var T=G(b);y=R(T,"Run ml_test"),T.forEach(_),this.h()},h(){B(o,"type","checkbox"),B(o,"id","option_1"),B(i,"for","option_1"),B(t,"type","submit"),B(e,"id","form")},m(u,r){C(u,e,r),c(e,o),c(e,a),c(e,i),c(i,n),c(e,p),c(e,m),c(e,s),c(e,t),c(t,f),C(u,d,r),C(u,b,r),c(b,y),v||(S=[x(e,"submit",l[0]),x(b,"click",N)],v=!0)},p:w,i:w,o:w,d(u){u&&_(e),u&&_(d),u&&_(b),v=!1,z(S)}}}function X(l){function e(o){I()}return[e]}class H extends W{constructor(e){super(),F(this,e,X,Q,D,{})}}export{H as default};
