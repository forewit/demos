import{S as x,i as C,s as M,k as m,a as P,q as R,l as g,m as B,c as E,r as S,h as y,n as _,b as w,E as n,L,I as U}from"../chunks/index.fce9d48b.js";let T=O;const s=64,q=`
@group(0) @binding(0)
var<storage, read_write> output: array<f32>;

@compute @workgroup_size(64)
fn main(
  @builtin(global_invocation_id)
  global_id : vec3u,

  @builtin(local_invocation_id)
  local_id : vec3u,
) {
  // Avoid accessing the buffer out of bounds
  if (global_id.x >= ${s}) {
    return;
  }

  output[global_id.x] =
    f32(global_id.x) * 1000. + f32(local_id.x);
}
`;async function O(){if(!navigator.gpu)throw Error("WebGPU not supported.");const u=await navigator.gpu.requestAdapter();if(!u)throw Error("Couldn't request WebGPU adapter.");const e=await u.requestDevice(),r=e.createShaderModule({code:q}),c=e.createBuffer({size:s,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC}),t=e.createBuffer({size:s,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),l=e.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),d=e.createBindGroup({layout:l,entries:[{binding:0,resource:{buffer:c}}]}),p=e.createComputePipeline({layout:e.createPipelineLayout({bindGroupLayouts:[l]}),compute:{module:r,entryPoint:"main"}}),i=e.createCommandEncoder(),o=i.beginComputePass();o.setPipeline(p),o.setBindGroup(0,d),o.dispatchWorkgroups(Math.ceil(s/64)),o.end(),i.copyBufferToBuffer(c,0,t,0,s),e.queue.submit([i.finish()]),await t.mapAsync(GPUMapMode.READ,0,s);const f=t.getMappedRange(0,s).slice(0);t.unmap(),console.log(new Float32Array(f))}function k(u){let e,r,c,t,l,d,p,i,o,h,f,G;return{c(){e=m("form"),r=m("input"),c=P(),t=m("label"),l=R("Enable option one"),d=P(),p=m("br"),i=P(),o=m("button"),h=R("Run"),this.h()},l(b){e=g(b,"FORM",{id:!0});var a=B(e);r=g(a,"INPUT",{type:!0,id:!0}),c=E(a),t=g(a,"LABEL",{for:!0});var v=B(t);l=S(v,"Enable option one"),v.forEach(y),d=E(a),p=g(a,"BR",{}),i=E(a),o=g(a,"BUTTON",{type:!0});var A=B(o);h=S(A,"Run"),A.forEach(y),a.forEach(y),this.h()},h(){_(r,"type","checkbox"),_(r,"id","option_1"),_(t,"for","option_1"),_(o,"type","submit"),_(e,"id","form")},m(b,a){w(b,e,a),n(e,r),n(e,c),n(e,t),n(t,l),n(e,d),n(e,p),n(e,i),n(e,o),n(o,h),f||(G=L(e,"submit",u[0]),f=!0)},p:U,i:U,o:U,d(b){b&&y(e),f=!1,G()}}}function D(u){function e(r){T()}return[e]}class W extends x{constructor(e){super(),C(this,e,D,k,M,{})}}export{W as default};
