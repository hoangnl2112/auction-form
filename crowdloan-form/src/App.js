import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component} from 'react';
import Select from "react-select";
import {web3Accounts, web3Enable, web3FromSource} from '@polkadot/extension-dapp';
import {ApiPromise, WsProvider} from '@polkadot/api';
import {stringToHex} from '@polkadot/util';
import {Alert, Button, FormControl, InputGroup, Spinner} from 'react-bootstrap';

const WAValidator = require('wallet-address-validator');
const receivedAddress = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectOptions: [],
            selectedAccount: null,
            erc20Address: null,
            isLinked: false,
            amount: 0,
            validAddress: true,
            isWalletLoading: true,
            message: '',
            successMessage: null,
            isSubmitting: false,
            errorMessage: null,
            signature: null,
            isSigning: true,
            currentWallet: localStorage.getItem('SELECTED_KSM_WALLET'),
        };
    }


    async componentDidMount() {
        setTimeout(() => {
            if (this.state.currentWallet) {
                web3Enable('Polkafoundry Crowdloan').then((extensions) => {
                    if (extensions.length === 0) {
                        this.setState({errorMessage: 'Polkadot.js Extension not installed or denied access. Please install or accept access to Polkadot.js Extension at "Manage Website Access" then reload this page.'})
                        return
                    }
                    web3Accounts().then((allAccounts) => {
                        if (allAccounts.length === 0) {
                            return
                        }
                        let options = []
                        allAccounts.map((val) => {
                            options.push({value: val.address, label: val.meta.name, data: val})
                            if (val.address === this.state.currentWallet) {
                                this.setState({selectedAccount: {value: val.address, label: val.meta.name, data: val}})
                            }
                        })
                        this.setState({selectOptions: options})
                        if (!this.state.currentWallet) {
                            this.setState({selectedAccount: options[0], currentWallet: options[0].data.address})
                        }
                        this.checkLinkedWallet(this.state.currentWallet)
                    })
                })
            }
            this.setState({isWalletLoading: false})
        }, 1000)
    }

    onchangePolWallet = (e) => {
        this.setState({selectedAccount: e, currentWallet: e.data.address})
        localStorage.setItem('SELECTED_KSM_WALLET', e.data.address)
        this.checkLinkedWallet(e.data.address)
    }

    onchangeERC20Wallet = (event) => {
        this.setState({erc20Address: event.target.value})
        this.validateERC20Address(event.target.value)
    }

    onchangeAmount = (event) => {
        this.setState({amount: event.target.value})
    }

    formatOptionLabel = ({value, label}) => (
        <div style={{display: "flex"}}>
            <div>{label}</div>
            <div style={{marginLeft: "10px", color: "#ccc"}}>
                {value}
            </div>
        </div>
    );

    linkAddress = async () => {
        this.setState({isSigning: true})
        if (!this.state.selectedAccount || !this.state.erc20Address || !this.state.validAddress) {
            this.setState({errorMessage: "Invalid Address!!!", isSigning: false})
            return
        }
        const injector = await web3FromSource(this.state.selectedAccount.data.meta.source);

        const signRaw = injector?.signer?.signRaw;

        if (!!signRaw) {
            signRaw({
                address: this.state.selectedAccount.data.address,
                data: stringToHex(this.state.selectedAccount.data.address + '|' + this.state.erc20Address),
                type: 'bytes'
            }).then((signature) => {
                this.setState({signature: signature.signature})
                this.sendLinkRequest({
                    signature: signature.signature,
                    ksm_address: this.state.selectedAccount.data.address,
                    erc20_address: this.state.erc20Address,
                })
            }).catch(err => {
                this.setState({
                    errorMessage: "Link Address failed. You must sign to link address before confirming the transaction",
                    isSigning: false,
                    isLinked: false
                })
            });
        }
    }

    submit = async () => {
        this.setState({message: '', isSubmitting: true})
        if (!this.state.selectedAccount || !this.state.amount || this.state.amount <= 0 || !this.state.erc20Address || !this.state.validAddress) {
            this.setState({errorMessage: "Invalid input or Address!!!", isSubmitting: false})
            return
        }
        const provider = new WsProvider('wss://rococo.polkafoundry.com');

        const api = await ApiPromise.create({provider});

        const transferExtrinsic = api.tx.balances.transfer(receivedAddress, this.state.amount * 1000_000_000_000)
        const injector = await web3FromSource(this.state.selectedAccount.data.meta.source);

        transferExtrinsic.signAndSend(this.state.selectedAccount.data.address, {signer: injector.signer}, ({status}) => {
            if (status.isInBlock) {
                this.setState({message: this.state.message + `Completed at block hash #${status.asInBlock.toString()}\n`});

            } else {
                this.setState({
                    message: this.state.message + `Current status: ${status.type}\n`,
                    isSubmitting: false
                });
            }
        }).catch((error: any) => {
            this.setState({
                errorMessage: this.state.message + 'transaction failed:' + error.toString(),
                isSubmitting: false
            });
        });
    }

    requestExtension = () => {
        web3Enable('CROWDLOAN').then((extensions) => {
            if (extensions.length === 0) {
                this.setState({errorMessage: "Polkadot.js Extension is not installed!"})
                return
            }
            web3Accounts().then((allAccounts) => {
                if (allAccounts.length === 0) {
                    this.setState({errorMessage: "KSM wallet list is empty. Please create or import your wallet!"})
                    return
                }
                let options = []
                allAccounts.map((val) => {
                    options.push({value: val.address, label: val.meta.name, data: val})
                })
                localStorage.setItem('SELECTED_KSM_WALLET', options[0].data.address);

                this.setState({
                    selectOptions: options,
                    selectedAccount: options[0],
                    currentWallet: options[0].data.address
                })
            });
        }).catch(reject => {
            localStorage.setItem('IS_REJECTED', true)
            this.setState({
                errorMessage: "You have denied access to Polkadot.js Extension. Please accept access to Polkadot.js Extension at \"Manage Website Access\" then reload this page.",
                isRejected: true
            })
        })
    }

    sendLinkRequest = (data) => {
        fetch('https://crowdloan.polkafoundry.com/api/v1/account/verify-message', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'},
        }).then(r => {
            if (r.status === 200) {
                this.setState({
                    successMessage: 'Link Address successful',
                    errorMessage: '',
                    isSigning: false,
                    isLinked: true
                })
            } else {
                this.setState({
                    isSigning: false,
                    isLinked: false,
                    successMessage: '',
                    errorMessage: 'Sending linked address to the server failed. Please contact support@example.com. Block hash: #' + data.block_hash
                })
            }
        })
    }

    validateERC20Address = (erc20Address) => {
        this.setState({isSigning: true})
        if (!WAValidator.validate(erc20Address, 'ETH')) {
            this.setState({
                validAddress: false,
                isSigning: false
            })
            return
        }
        fetch(`https://crowdloan.polkafoundry.com/api/v1/account/link?kusama_address=${this.state.selectedAccount.data.address}&erc20_address=${erc20Address}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
        }).then(response => {
            return response.json();
        }).then(data => {
            if (data.code === 422) {
                this.setState({
                    isSigning: false,
                    validAddress: false,
                    successMessage: '',
                    errorMessage: 'ERC20 The address is invalid or has been linked to another KSM address address'
                })
            }
            if (data.code === 200) {
                this.setState({
                    isSigning: false,
                    validAddress: true,
                    errorMessage: '',
                    erc20Address: erc20Address
                })
            }
        }).catch((err) => {
            this.setState({errorMessage: 'Check linked address failed: ' + err.toString()})
        });
    }

    checkLinkedWallet = (address) => {
        this.setState({isSigning: true})
        fetch(`https://crowdloan.polkafoundry.com/api/v1/account/${address}/check-link`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
        }).then(response => {
            return response.json();
        }).then(data => {
            if (data.code === 422) {
                this.setState({
                    isSigning: false,
                    isLinked: false,
                    erc20Address: null
                })
            }
            if (data.code === 200) {
                this.setState({
                    isSigning: false,
                    isLinked: true,
                    erc20Address: data.data
                })
            }
        }).catch((err) => {
            this.setState({errorMessage: 'Check linked address failed: ' + err.toString()})
        });
    }

    render() {

        return (
            <div className="App">
                <div className="container">
                    <h3 className="header">PolkaFoundry Crowdloan</h3>
                    <div className="content">
                        <span
                            className="label-input">{this.state.currentWallet ? "Select your KSM Wallet" : "Connect to KSM Wallet"}</span>
                        {this.state.currentWallet && !this.state.isWalletLoading ?
                            <Select
                                value={this.state.selectedAccount}
                                formatOptionLabel={this.formatOptionLabel}
                                options={this.state.selectOptions}
                                onChange={event => this.onchangePolWallet(event)}
                            /> :
                            <Button variant="info" onClick={this.requestExtension}>{this.state.isWalletLoading ?
                                <Spinner animation="border" variant="light" role="status" size="sm">
                                    <span className="sr-only">Loading...</span>
                                </Spinner> : "Connect Polkadot.js Extension"}</Button>}
                        <span className="label-input">Enter your ERC20 wallet to get rewarded</span>
                        <InputGroup>
                            <FormControl
                                value={this.state.erc20Address ? this.state.erc20Address : ''}
                                placeholder={'Only ERC20 Address'}
                                onChange={this.onchangeERC20Wallet}
                                readOnly={this.state.isLinked}
                                ref={(input) => {
                                    this.erc20AddressInput = input;
                                }}
                            />
                            <InputGroup.Append>
                                <Button variant="info"
                                        disabled={this.state.isSigning || !this.state.erc20Address || !this.state.validAddress || this.state.isLinked}
                                        onClick={this.linkAddress} style={{minWidth: 120, zIndex: 0}}>{
                                    this.state.isSigning ?
                                        <Spinner animation="border" variant="light" role="status" size="sm">
                                            <span className="sr-only">Loading...</span>
                                        </Spinner> : (<span>
                                            {this.state.isLinked ? 'Linked' : 'Link address'
                                            }</span>)}</Button>
                            </InputGroup.Append>
                        </InputGroup>
                        {!this.state.erc20Address ? '' : <div>
                            {!this.state.validAddress ?
                                <span style={{color: '#a51c1c', fontSize: 11}}>Invalid Address !</span> :
                                <span style={{color: '#00b33a', fontSize: 11}}>Valid Address</span>} </div>}
                        <span className="mt-3 label-input">Enter KSM Amount</span>
                        <InputGroup className="mb-3">
                            <FormControl
                                aria-describedby="ksm-amount"
                                type="number"
                                placeholder={'KSM Amount'}
                                onChange={this.onchangeAmount}
                            />
                            <InputGroup.Append>
                                <InputGroup.Text id="ksm-amount">KSM</InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                        <Button style={{marginTop: 20}} variant="secondary" onClick={this.submit}
                                disabled={!this.state.isLinked || !this.state.amount || !this.state.selectedAccount || this.state.isSubmitting}>{this.state.isSubmitting ? (
                            <Spinner animation="border" variant="light" role="status" size="sm">
                                <span className="sr-only">Loading...</span>
                            </Spinner>) : "Sign transfer"}</Button>
                        <br/>
                        {this.state.message ?
                            <Alert variant="info">
                                <pre style={{whiteSpace: 'pre-wrap'}}>{this.state.message}</pre>
                            </Alert> : ''
                        }
                        {this.state.successMessage ? <Alert variant="success" style={{marginTop: 10}}>
                            <span>{this.state.successMessage}</span>
                        </Alert> : ''}
                        {this.state.errorMessage ? <Alert variant="danger" style={{marginTop: 10}}>
                            <span>{this.state.errorMessage}</span>
                        </Alert> : ''}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
