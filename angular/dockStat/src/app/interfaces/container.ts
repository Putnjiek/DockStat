import { State } from "../enums/state";

export interface Container {
    name: string,
    id: string,
    hostName: string,
    state: State,
    cpu_usage: number,
    mem_usage: number,
    mem_limit: number,
    net_rx: number,
    net_tx: number,
    current_net_rx: number,
    current_net_tx: number,
    networkMode: string,
    link?: string,
    icon?: string,
    tags?: string
}