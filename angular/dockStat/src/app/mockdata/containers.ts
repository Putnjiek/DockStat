import { State } from "../components/enums/state";
import { Container } from "../interfaces/container";

export const mockContainers: Container[] = [
    {
        cpu_usage: 0.02,
        current_net_rx: 0,
        current_net_tx: 0,
        hostName: "",
        id: "1",
        mem_limit: 7.57,
        mem_usage: 0.01,
        name: "docker-important-filegator-1",
        net_rx: 0,
        net_tx: 0,
        networkMode: "",
        state: State.available
    },
    {
        cpu_usage: 0.97,
        current_net_rx: 0,
        current_net_tx: 0,
        hostName: "",
        id: "1",
        mem_limit: 7.57,
        mem_usage: 0.06,
        name: "dockstat-demo",
        net_rx: 0,
        net_tx: 0,
        networkMode: "",
        state: State.available,
        tags: "public"
    },
    {
        cpu_usage: 0.97,
        current_net_rx: 0,
        current_net_tx: 0,
        hostName: "",
        id: "1",
        mem_limit: 7.57,
        mem_usage: 0.04,
        name: "dockstat",
        net_rx: 0,
        net_tx: 0,
        networkMode: "",
        state: State.available
    },
    {
        cpu_usage: 5.26,
        current_net_rx: 0,
        current_net_tx: 0.07,
        hostName: "",
        id: "1",
        mem_limit: 7.57,
        mem_usage: 0.01,
        name: "dozzle",
        net_rx: 0,
        net_tx: 0,
        networkMode: "",
        state: State.available
    },
    {
        cpu_usage: 1.35,
        current_net_rx: 0,
        current_net_tx: 0,
        hostName: "",
        id: "1",
        mem_limit: 7.57,
        mem_usage: 0.04,
        name: "postgres",
        net_rx: 0,
        net_tx: 0,
        networkMode: "",
        state: State.available,
        tags: "databank"
    },
]