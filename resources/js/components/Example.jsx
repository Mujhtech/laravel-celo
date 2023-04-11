import React from "react";
import ReactDOM from "react-dom/client";
import { Identicon } from "./Identicon";
import { shortenAddress } from "../utils/address";
import { CeloProvider, useCelo } from "@celo/react-celo";
import "@celo/react-celo/lib/styles.css";

function Example() {
    const { address, initialised, connect, disconnect, performActions } =
        useCelo();
    const [transferTo, setTransferTo] = React.useState("");
    const [transferAmount, setTransferAmount] = React.useState(0);

    async function transfer() {
        e.preventDefault();
        await performActions(async (kit) => {
            const cUSD = await kit.contracts.getStableToken();
            await cUSD
                .transfer(transferTo, transferAmount)
                .sendAndWaitForReceipt();
        });
    }

    return (
        <CeloProvider
            dapp={{
                name: "Laravel Celo",
                description: "Laravel Celo Dapp",
                url: "https://example.com",
                // if you plan on supporting WalletConnect compatible wallets, you need to provide a project ID, you can find it here: https://docs.walletconnect.com/2.0/cloud/relay
                // walletConnectProjectId: "123",
            }}
        >
            <div className="bg-gray-300 min-h-screen w-full flex flex-col justify-center items-center">
                <div className="w-full max-w-[400px] m-auto">
                    <div className="bg-white w-full px-2 py-4">
                        <div className="flex flex-col">
                            <h4 className="font-bold text-center">
                                Laravel Celo
                            </h4>
                            {address != null && address != undefined ? (
                                <>
                                    <div className="flex items-center justify-center space-x-2 mt-6">
                                        <Identicon
                                            size={24}
                                            address={address}
                                        />{" "}
                                        <p>
                                            {shortenAddress(
                                                address,
                                                true,
                                                false
                                            )}
                                        </p>
                                    </div>

                                    <form
                                        className="flex flex-col"
                                        onSubmit={(e) => transfer(e)}
                                    >
                                        <label className="mt-6 text-sm">
                                            Address
                                        </label>
                                        <input
                                            onChange={(e) =>
                                                setTransferTo(e.target.value)
                                            }
                                            type="text"
                                            required
                                            className="h-8 rounded-md bg-gray-300 focus:ring-0 ring-0 border-0 focus:border-0 focus:outline-none text-black px-2 py-1"
                                        />
                                        <label className="mt-2 text-sm">
                                            Amount
                                        </label>
                                        <input
                                            onChange={(e) =>
                                                setTransferAmount(
                                                    e.target.value
                                                )
                                            }
                                            type="number"
                                            required
                                            className="h-8 rounded-md bg-gray-300 focus:ring-0 ring-0 border-0 focus:border-0 focus:outline-none text-black px-2 py-1"
                                        />
                                        <button className="mt-4 bg-[#FCFF51] text-black rounded-2xl py-3">
                                            Send
                                        </button>
                                    </form>
                                </>
                            ) : (
                                <>
                                    <button
                                        type="button"
                                        onClick={() => connect()}
                                        className="mt-4 bg-[#FCFF51] text-black rounded-2xl py-3"
                                    >
                                        Connect wallet
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </CeloProvider>
    );
}

export default Example;

if (document.getElementById("example")) {
    const Index = ReactDOM.createRoot(document.getElementById("example"));

    Index.render(
        <React.StrictMode>
            <Example />
        </React.StrictMode>
    );
}
