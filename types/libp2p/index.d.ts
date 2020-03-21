// Type definitions for libp2p 0.22.0
// Project: https://github.com/libp2p/js-libp2p
// Definitions by: Jaco Greeff <https://github.com/jacogr>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/// <reference types="libp2p-bootstrap"/>
/// <reference types="interface-connection"/>
/// <reference types="interface-transport"/>
/// <reference types="libp2p-kad-dht"/>
/// <reference types="libp2p-mdns"/>
/// <reference types="libp2p-mplex"/>
/// <reference types="libp2p-secio"/>
/// <reference types="libp2p-spdy"/>
/// <reference types="peer-info"/>


declare module 'libp2p' {
    export default LibP2p;

    import * as PeerInfo from 'peer-info'
    import * as Multiaddr from 'multiaddr'

    namespace LibP2p {
        export type OptionsConfig = {
            contentRouting?: {},
            dht?: {
                enabled?: boolean
                kBucketSize?: number
            },
            peerDiscovery?: {
                autoDial?: boolean,
                enabled?: boolean,
                bootstrap?: {
                    interval?: number
                    enabled?: boolean
                    list?: Multiaddr[]
                },
                mdns?: {
                    interval?: number
                    enabled?: boolean
                },
                webRTCStar?: {
                    interval?: number
                    enabled?: boolean
                },
                websocketStar?: {
                    enabled?: boolean
                }
            },
            peerRouting?: {},
            pubsub?: {
                enabled?: boolean,
                emitSelf?: boolean,
                signMessages?: boolean,
                strictSigning?: boolean
            },
            relay?: {
                enabled?: boolean,
                hop?: {
                    enabled?: boolean,
                    active?: boolean
                }
            }
        };

        export type OptionsModules = {
            connEncryption?: Array<LibP2pSecio>,
            streamMuxer: Array<LibP2pMplex | LibP2pSpdy>,
            dht?: typeof LibP2pKadDht,
            peerDiscovery: Array<typeof LibP2pBootstrap>,
            transport: LibP2pTransport[]
        };

        export type Options = {
            config: OptionsConfig,
            modules: OptionsModules,
            peerStore?: PeerStore,
            peerInfo: PeerInfo,
        };

        export type Events = 'peer:connect' | 'peer:disconnect' | 'peer:discovery' | 'start' | 'stop';
    }

    class PeerStore {
        peers: Map<string, PeerInfo>
    }

    class LibP2p {
        readonly _dht: LibP2pKadDht;

        constructor(options?: LibP2p.Options);
        static create(options?: LibP2p.Options): Promise<LibP2p>

        readonly peerInfo: PeerInfo;
        readonly peerStore: PeerStore;

        dial(peerInfo: PeerInfo | string): Promise<LibP2pConnection>;
        dialProtocol(peerInfo: PeerInfo | Multiaddr, protocol: string): Promise<LibP2pConnection>;
        hangUp(peerInfo: PeerInfo): Promise<void>;
        handle(protocol: string, handler: (protocol: string, conn: LibP2pConnection) => any, matcher?: (protocol: string, requestedProtocol: string, cb: (error: Error | null, accept: boolean) => void) => any): void;
        unhandle(protocol: string): void;
        isStarted(): boolean;
        on(event: LibP2p.Events, cb: (event: any) => any): this;
        once(event: LibP2p.Events, cb: (event: any) => any): this;
        removeListener(event: LibP2p.Events, cb: (event: any) => any): this;
        ping(peerInfo: PeerInfo | string): Promise<void>;
        start(): Promise<void>;
        stop(): Promise<void>;
    }

}