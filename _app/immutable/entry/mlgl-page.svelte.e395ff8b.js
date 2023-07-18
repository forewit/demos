import{S,i as x,s as C,k as m,a as P,q as w,l as g,m as B,c as E,r as R,h as y,n as _,b as M,E as r,L,I as U}from"../chunks/index.fce9d48b.js";//! Utility Functions ********************
let T=q;//! Setup webgpu *************************
const u=64,k=`
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
  if (global_id.x >= ${u}) {
    return;
  }

  output[global_id.x] =
    f32(global_id.x) * 1000. + f32(local_id.x);
}
`;async function q(){//! 1: request adapter and device
if(!navigator.gpu)throw Error("WebGPU not supported.");const i=await navigator.gpu.requestAdapter({powerPreference:"high-performance"});if(!i)throw Error("Couldn't request WebGPU adapter.");i.isFallbackAdapter&&console.warn("WebGPU is using a fallback adapter!");const e=await i.requestDevice();//! 2: Create a shader module from the shader template literal
const n=e.createShaderModule({code:k});//! 3: Create an output buffer to read GPU calculations to, and a staging buffer to be mapped for JavaScript access
const c=e.createBuffer({size:u,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC}),t=e.createBuffer({size:u,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST});//! 4: Create a GPUBindGroupLayout to define the bind group structure, create a GPUBindGroup from it,
const l=e.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}}]}),p=e.createBindGroup({layout:l,entries:[{binding:0,resource:{buffer:c}}]}),d=e.createComputePipeline({layout:e.createPipelineLayout({bindGroupLayouts:[l]}),compute:{module:n,entryPoint:"main"}});//! 5: Create GPUCommandEncoder to issue commands to the GPU
const s=e.createCommandEncoder();//! 6: Initiate render pass
const a=s.beginComputePass();//! 7: Issue commands
a.setPipeline(d),a.setBindGroup(0,p),a.dispatchWorkgroups(Math.ceil(u/64)),a.end(),s.copyBufferToBuffer(c,0,t,0,u);//! 8: End frame by passing array of command buffers to command queue for execution
e.queue.submit([s.finish()]),await t.mapAsync(GPUMapMode.READ,0,u);const f=t.getMappedRange(0,u).slice(0);t.unmap(),console.log(new Float32Array(f))}function O(i){let e,n,c,t,l,p,d,s,a,h,f,G;return{c(){e=m("form"),n=m("input"),c=P(),t=m("label"),l=w("Enable option one"),p=P(),d=m("br"),s=P(),a=m("button"),h=w("Run"),this.h()},l(b){e=g(b,"FORM",{id:!0});var o=B(e);n=g(o,"INPUT",{type:!0,id:!0}),c=E(o),t=g(o,"LABEL",{for:!0});var v=B(t);l=R(v,"Enable option one"),v.forEach(y),p=E(o),d=g(o,"BR",{}),s=E(o),a=g(o,"BUTTON",{type:!0});var A=B(a);h=R(A,"Run"),A.forEach(y),o.forEach(y),this.h()},h(){_(n,"type","checkbox"),_(n,"id","option_1"),_(t,"for","option_1"),_(a,"type","submit"),_(e,"id","form")},m(b,o){M(b,e,o),r(e,n),r(e,c),r(e,t),r(t,l),r(e,p),r(e,d),r(e,s),r(e,a),r(a,h),f||(G=L(e,"submit",i[0]),f=!0)},p:U,i:U,o:U,d(b){b&&y(e),f=!1,G()}}}function F(i){function e(n){T()}return[e]}class D extends S{constructor(e){super(),x(this,e,F,O,C,{})}}export{D as default};
