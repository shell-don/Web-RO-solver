/* tslint:disable */
/* eslint-disable */

export function gen_constraints(nb_variables: number, nb_contraintes: number): string;

export function gen_html_basique(): string;

export function gen_objective_constraints(nb_variables: number, nb_contraintes: number): string;

export function gen_objective_function(nb_variables: number): string;

export function resoudre_basique(coeffs_obj: Float64Array, direction: string, domains_json: string, constraint_coeffs_json: string, constraint_signs_json: string, constraint_rhs: Float64Array, nb_variables: number, nb_contraintes: number): string;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly gen_constraints: (a: number, b: number) => [number, number];
    readonly gen_html_basique: () => [number, number];
    readonly gen_objective_constraints: (a: number, b: number) => [number, number];
    readonly gen_objective_function: (a: number) => [number, number];
    readonly resoudre_basique: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number, n: number) => [number, number];
    readonly __externref_table_alloc: () => number;
    readonly __wbindgen_externrefs: WebAssembly.Table;
    readonly __wbindgen_free: (a: number, b: number, c: number) => void;
    readonly __wbindgen_malloc: (a: number, b: number) => number;
    readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
    readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
 * Instantiates the given `module`, which can either be bytes or
 * a precompiled `WebAssembly.Module`.
 *
 * @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
 *
 * @returns {InitOutput}
 */
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
 * If `module_or_path` is {RequestInfo} or {URL}, makes a request and
 * for everything else, calls `WebAssembly.instantiate` directly.
 *
 * @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
 *
 * @returns {Promise<InitOutput>}
 */
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
