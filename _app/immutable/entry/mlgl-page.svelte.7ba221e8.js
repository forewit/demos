import{S as x,i as C,s as S,k as b,a as P,q as R,l as m,m as y,c as U,r as w,h as B,n as _,b as M,E as r,L as k,I as E}from"../chunks/index.fce9d48b.js";let O=q;const n=1e3,T=`
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
  if (global_id.x >= ${n}) {
    return;
  }

  output[global_id.x] =
    f32(global_id.x) * 1000. + f32(local_id.x);

  output2[global_id.x] = f32(global_id.x);
}
`;async function q(){if(!navigator.gpu)throw Error("WebGPU not supported.");const u=await navigator.gpu.requestAdapter({powerPreference:"high-performance"});if(!u)throw Error("Couldn't request WebGPU adapter.");u.isFallbackAdapter&&console.warn("WebGPU is using a fallback adapter!");const e=await u.requestDevice(),i=e.createShaderModule({code:T}),p=e.createBuffer({size:n,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC}),o=e.createBuffer({size:n,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC}),s=e.createBuffer({size:n,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),l=e.createComputePipeline({layout:"auto",compute:{module:i,entryPoint:"main"}}),f=e.createBindGroup({layout:l.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:p}},{binding:1,resource:{buffer:o}}]}),c=e.createCommandEncoder(),t=c.beginComputePass();t.setPipeline(l),t.setBindGroup(0,f),t.dispatchWorkgroups(Math.ceil(n/64)),t.setBindGroup(1,f),t.dispatchWorkgroups(Math.ceil(n/64)),t.end(),c.copyBufferToBuffer(o,0,s,0,n),e.queue.submit([c.finish()]),await s.mapAsync(GPUMapMode.READ,0,n);const d=s.getMappedRange(0,n).slice(0);s.unmap(),console.log(new Float32Array(d))}function W(u){let e,i,p,o,s,l,f,c,t,h,d,G;return{c(){e=b("form"),i=b("input"),p=P(),o=b("label"),s=R("Enable option one"),l=P(),f=b("br"),c=P(),t=b("button"),h=R("Run"),this.h()},l(g){e=m(g,"FORM",{id:!0});var a=y(e);i=m(a,"INPUT",{type:!0,id:!0}),p=U(a),o=m(a,"LABEL",{for:!0});var v=y(o);s=w(v,"Enable option one"),v.forEach(B),l=U(a),f=m(a,"BR",{}),c=U(a),t=m(a,"BUTTON",{type:!0});var A=y(t);h=w(A,"Run"),A.forEach(B),a.forEach(B),this.h()},h(){_(i,"type","checkbox"),_(i,"id","option_1"),_(o,"for","option_1"),_(t,"type","submit"),_(e,"id","form")},m(g,a){M(g,e,a),r(e,i),r(e,p),r(e,o),r(o,s),r(e,l),r(e,f),r(e,c),r(e,t),r(t,h),d||(G=k(e,"submit",u[0]),d=!0)},p:E,i:E,o:E,d(g){g&&B(e),d=!1,G()}}}function F(u){function e(i){O()}return[e]}class D extends x{constructor(e){super(),C(this,e,F,W,S,{})}}export{D as default};
