/**
 * ML in shaders: https://www.diva-portal.org/smash/get/diva2:829298/FULLTEXT01.pdf
 * Neural Net in shader: https://github.com/SCRN-VRC/SimpNet-Deep-Learning-in-a-Shader
 *
 */

// imports
import gpu from "$lib/gpu";

//! --------- exports -------------
let mlgl = {}
export default mlgl;
//! -------------------------------

function sigmoid(x: number): number { return 1 / 1 + Math.exp(-x) }
function logit(x: number): number { return Math.log(x / (1 - x)) }
function ml_train() { } // returns a model
function ml_run() { } // returns output of a model given inputs