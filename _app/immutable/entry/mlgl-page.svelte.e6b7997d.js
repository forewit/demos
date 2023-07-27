import{S as A,i as x,s as R,k as y,a as U,q as k,l as m,m as B,c as G,r as E,h as P,n as h,b as C,E as u,L as O,I as w,o as T}from"../chunks/index.fce9d48b.js";//! --------- exports -------------
let S={compute:q};//! -------------------------------
async function q(c,t,...o){if(!navigator.gpu)throw Error("WebGPU not supported.");const n=await navigator.gpu.requestAdapter({powerPreference:"high-performance"});if(!n)throw Error("Couldn't request WebGPU adapter.");n.isFallbackAdapter&&console.warn("WebGPU is using a fallback adapter!");const a=await n.requestDevice(),p=a.createShaderModule({code:c}),i=a.createComputePipeline({layout:"auto",compute:{module:p,entryPoint:"main"}}),s=o.map(e=>({binding:e.id,GPUBuffer:a.createBuffer({usage:e.usage,size:e.byteSize}),data:e.data}));for(const e of s)e.data&&a.queue.writeBuffer(e.GPUBuffer,0,e.data,0,e.data.length);const _=s.filter(e=>!e.data).map(e=>({binding:e.binding,source:e.GPUBuffer,destination:a.createBuffer({usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST,size:e.GPUBuffer.size})})),l=a.createBindGroup({layout:i.getBindGroupLayout(0),entries:s.map(e=>({binding:e.binding,resource:{buffer:e.GPUBuffer}}))}),g=a.createCommandEncoder(),f=g.beginComputePass();f.setPipeline(i),f.setBindGroup(0,l),f.dispatchWorkgroups(t),f.end();for(const e of _)g.copyBufferToBuffer(e.source,0,e.destination,0,e.destination.size);a.queue.submit([g.finish()]);let b={};for(const e of _){await e.destination.mapAsync(GPUMapMode.READ,0,e.destination.size);const r=e.destination.getMappedRange(0,e.destination.size);b[e.binding]=new Float32Array(r.slice(0)),e.destination.unmap()}return b}//! --------- exports -------------
let L={test:D},d={layer_size:4,layer_count:5,layers:Float32Array.from([1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1])};const M=`
// represents all the layers in one long f32 array 
@group(0) @binding(0) var<storage> layers: array<f32, ${d.layers.length}>;

// output of the network
@group(0) @binding(1) var<storage, read_write> output: array<f32, ${d.layer_size}>;

/*
// squashes its input value into the range (0,1)
fn sigmoid(x: f32) -> f32 {
    return 1.0 / (1.0 + exp(-x));
}
*/

// workgroup size is the byte size of a single layer (32 * layer size)
@compute @workgroup_size(32 * ${d.layer_size}) 
fn main(
    @builtin(local_invocation_id) local_id : vec3<u32>, 
    @builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>
) {
    output[workgroup_id.x] = f32(1) + layers[0]*0;
}`;function D(){S.compute(M,d.layer_count,{id:0,byteSize:d.layers.byteLength,data:d.layers,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST},{id:1,byteSize:d.layers.byteLength/d.layer_count,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC}).then(c=>{console.log(c[1])})}function $(c){let t,o,n,a,p,i,s,_,l,g,f,b;return{c(){t=y("form"),o=y("input"),n=U(),a=y("label"),p=k("Enable option one"),i=U(),s=y("br"),_=U(),l=y("button"),g=k("Run"),this.h()},l(e){t=m(e,"FORM",{id:!0});var r=B(t);o=m(r,"INPUT",{type:!0,id:!0}),n=G(r),a=m(r,"LABEL",{for:!0});var v=B(a);p=E(v,"Enable option one"),v.forEach(P),i=G(r),s=m(r,"BR",{}),_=G(r),l=m(r,"BUTTON",{type:!0});var z=B(l);g=E(z,"Run"),z.forEach(P),r.forEach(P),this.h()},h(){h(o,"type","checkbox"),h(o,"id","option_1"),h(a,"for","option_1"),h(l,"type","submit"),h(t,"id","form")},m(e,r){C(e,t,r),u(t,o),u(t,n),u(t,a),u(a,p),u(t,i),u(t,s),u(t,_),u(t,l),u(l,g),f||(b=O(t,"submit",c[0]),f=!0)},p:w,i:w,o:w,d(e){e&&P(t),f=!1,b()}}}function F(c){async function t(){let o=new Float32Array(Array.from({length:32},(i,s)=>s));const n=8,a=4,p=`
@group(0) @binding(0) var<storage> input: array<f32>;
@group(0) @binding(1) var<storage, read_write> output: array<f32>;

@compute @workgroup_size(${n})
fn main(
  @builtin(local_invocation_id) local_id : vec3<u32>, 
  @builtin(global_invocation_id) global_id : vec3<u32>,
  @builtin(workgroup_id) workgroup_id : vec3<u32>
) {
  output[global_id.x] = f32(global_id.x)*1000 + f32(local_id.x) + 0*input[0];
  //output[global_id.x] = f32(workgroup_id.x);
}`;S.compute(p,a,{id:0,byteSize:o.byteLength,data:o,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST},{id:1,byteSize:o.byteLength,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC}).then(i=>{console.log(i[1])})}return T(()=>{L.test()}),[t]}class W extends A{constructor(t){super(),x(this,t,F,$,R,{})}}export{W as default};
