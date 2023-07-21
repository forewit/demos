import{S as q,i as F,s as D,k as _,a as h,q as R,l as B,m as y,c as E,r as v,h as P,n as G,b as w,E as f,L as z,I as C,Q as W}from"../chunks/index.fce9d48b.js";//! --------- exports -------------
let L={compute:Y};//! -------------------------------
const x=1e3;async function Y(l,...t){if(!navigator.gpu)throw Error("WebGPU not supported.");const r=await navigator.gpu.requestAdapter({powerPreference:"high-performance"});if(!r)throw Error("Couldn't request WebGPU adapter.");r.isFallbackAdapter&&console.warn("WebGPU is using a fallback adapter!");const o=await r.requestDevice(),u=o.createShaderModule({code:l}),i=o.createComputePipeline({layout:"auto",compute:{module:u,entryPoint:"main"}}),d=t.map(e=>({binding:e.binding,GPUBuffer:o.createBuffer({usage:e.usage,size:e.size?e.size:e.data?e.data.byteLength:x}),data:e.data})),m=d.filter(e=>!e.data).map(e=>({binding:e.binding,source:e.GPUBuffer,destination:o.createBuffer({usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST,size:e.GPUBuffer.size})})),p=o.createBindGroup({layout:i.getBindGroupLayout(0),entries:d.map(e=>({binding:e.binding,resource:{buffer:e.GPUBuffer}}))}),a=o.createCommandEncoder(),g=a.beginComputePass();g.setPipeline(i),g.setBindGroup(0,p),g.dispatchWorkgroups(Math.ceil(x/64)),g.end();for(const e of m)a.copyBufferToBuffer(e.source,0,e.destination,0,e.destination.size);o.queue.submit([a.finish()]);let c={};for(const e of m){await e.destination.mapAsync(GPUMapMode.READ,0,e.destination.size);const U=e.destination.getMappedRange(0,e.destination.size);c[e.binding]=new Float32Array(U.slice(0)),e.destination.unmap()}return console.log(c),c}let I=Z,N=$;const b=1e3,k=`
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
  if (global_id.x >= ${b}) {
    return;
  }

  output[global_id.x] =
    f32(global_id.x) * 1000. + f32(local_id.x);

  output2[global_id.x] = f32(global_id.x);
}
`;async function $(){L.compute(k,{binding:0,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC},{binding:1,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC})}async function Z(){if(!navigator.gpu)throw Error("WebGPU not supported.");const l=await navigator.gpu.requestAdapter({powerPreference:"high-performance"});if(!l)throw Error("Couldn't request WebGPU adapter.");l.isFallbackAdapter&&console.warn("WebGPU is using a fallback adapter!");const t=await l.requestDevice(),r=t.createShaderModule({code:k}),o=t.createBuffer({size:b,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC}),u=t.createBuffer({size:b,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC}),i=t.createBuffer({size:b,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),d=t.createComputePipeline({layout:"auto",compute:{module:r,entryPoint:"main"}}),m=t.createBindGroup({layout:d.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:o}},{binding:1,resource:{buffer:u}}]}),p=t.createCommandEncoder(),a=p.beginComputePass();a.setPipeline(d),a.setBindGroup(0,m),a.dispatchWorkgroups(Math.ceil(b/64)),a.end(),p.copyBufferToBuffer(o,0,i,0,b),t.queue.submit([p.finish()]),await i.mapAsync(GPUMapMode.READ,0,b);const c=i.getMappedRange(0,b).slice(0);i.unmap(),console.log(new Float32Array(c))}function Q(l){let t,r,o,u,i,d,m,p,a,g,c,e,U,A,S;return{c(){t=_("form"),r=_("input"),o=h(),u=_("label"),i=R("Enable option one"),d=h(),m=_("br"),p=h(),a=_("button"),g=R("Run ml_init"),c=h(),e=_("button"),U=R("Run ml_test"),this.h()},l(s){t=B(s,"FORM",{id:!0});var n=y(t);r=B(n,"INPUT",{type:!0,id:!0}),o=E(n),u=B(n,"LABEL",{for:!0});var M=y(u);i=v(M,"Enable option one"),M.forEach(P),d=E(n),m=B(n,"BR",{}),p=E(n),a=B(n,"BUTTON",{type:!0});var T=y(a);g=v(T,"Run ml_init"),T.forEach(P),n.forEach(P),c=E(s),e=B(s,"BUTTON",{});var O=y(e);U=v(O,"Run ml_test"),O.forEach(P),this.h()},h(){G(r,"type","checkbox"),G(r,"id","option_1"),G(u,"for","option_1"),G(a,"type","submit"),G(t,"id","form")},m(s,n){w(s,t,n),f(t,r),f(t,o),f(t,u),f(u,i),f(t,d),f(t,m),f(t,p),f(t,a),f(a,g),w(s,c,n),w(s,e,n),f(e,U),A||(S=[z(t,"submit",l[0]),z(e,"click",N)],A=!0)},p:C,i:C,o:C,d(s){s&&P(t),s&&P(c),s&&P(e),A=!1,W(S)}}}function j(l){function t(r){I()}return[t]}class J extends q{constructor(t){super(),F(this,t,j,Q,D,{})}}export{J as default};
