import React from "react";
import { Modal } from "bootstrap";
import axios from "axios";
import Navbar from "../Navbar";
import { baseUrl,authorization } from "../config";
import { error } from "jquery";

class Member extends React.Component {
    constructor() {
        super()
        this.state = {
            id_member: "",
            nama: "",
            alamat: "",
            jenis_kelamin: "",
            telepon: "",
            action: "",
            role: "",
            visible: true,
            members: [
                {
                    id_member: "1", nama: "Nur Azizah Rosidah", alamat: "Malang", jenis_kelamin: "Wanita", telepon: "089659748386"
                },
                {
                    id_member: "2", nama: "Rijal", alamat: "Sidoarjo", jenis_kelamin: "Pria", telepon: "089505993095"
                },
                {
                    id_member: "3", nama: "Human", alamat: "Surabaya", jenis_kelamin: "Wanita", telepon: "089060204171"
                }
            ]
        }
        if (!localStorage.getItem("token")) {
            window.location.href = "/login"
        }
    }
    tambahData() {
        this.modalMember = new Modal(document.getElementById("modal_member"))
        this.modalMember.show() //menampilkan modal


        //reset state untuk form member
        this.setState({
            action: "tambah",
            id_member: Math.random(1, 100000),
            nama: "",
            alamat: "",
            jenis_kelamin: "",
            telepon: ""
        })
    }

    hapusData(id_member) {
        if (window.confirm("Apakah anda yakin menghapus data ini?")) {
            let endpoint = `${baseUrl}/member/${id_member}`

            axios.delete(endpoint,authorization)
                .then(response => {
                    window.alert(response.data.message)
                    this.getData()
                })
                .catch(error => console.log(error))
            //mencari posisi index dari data yg akan dihapus
            // let temp = this.state.members
            // let index = temp.findIndex(member => member.id_member === id_member)

            // //dihapus data pada array
            // temp.splice(index, 1)

            // this.setState({ members: temp })

        }

    }
    ubahData(id_member) {
        this.modalMember = new Modal(document.getElementById("modal_member"))
        this.modalMember.show() //menampilkan modal

        //mencari index posisi dari data member yg akan diubah
        let index = this.state.members.findIndex(
            member => member.id_member === id_member
        )

        this.setState({
            action: "ubah",
            id_member: id_member,
            nama: this.state.members[index].nama,
            alamat: this.state.members[index].alamat,
            jenis_kelamin: this.state.members[index].jenis_kelamin,
            telepon: this.state.members[index].telepon
        })
    }
    simpanData(event) {
        event.preventDefault();
        //prefentDefault -> mencegah aksi default refresh di page form submit

        if (this.state.action === "tambah") {
            let endpoint = `${baseUrl}/member`
            //menampung data isian dari user
            let data = {
                id_member: this.state.id_member,
                nama: this.state.nama,
                alamat: this.state.alamat,
                jenis_kelamin: this.state.jenis_kelamin,
                telepon: this.state.telepon
            }

            //tambahkan ke state members (array)
            //let temp = this.state.members
            //temp.push(data) //menambah data pada array
            //this.setState({ members: temp })
            //menghilangkan modal
            //this.modalMember.hide()

            axios.post(endpoint, data,authorization)
                .then(response => {
                    window.alert(response.data.message)
                    this.getData()
                })
                .catch(error => console.log(error))

        } else if (this.state.action === "ubah") {
            let endpoint = `${baseUrl}/member` + this.state.id_member
            // let temp = this.state.members
            // let index = temp.findIndex(
            //     member => member.id_member === this.state.id_member
            // )

            // temp[index].nama = this.state.nama
            // temp[index].alamat = this.state.alamat
            // temp[index].jenis_kelamin = this.state.jenis_kelamin
            // temp[index].telepon = this.state.telepon
            // this.setState({ members: temp })
            let data = {
                id_member: this.state.id_member,
                nama: this.state.nama,
                alamat: this.state.alamat,
                jenis_kelamin: this.state.jenis_kelamin,
                telepon: this.state.telepon
            }
            axios.put(endpoint, data, authorization)
                .then(response => {
                    window.alert(response.data.message)
                    this.getData()
                })
                .catch(error => console.log(error))
            this.modalMember.hide()
        }

    }

    getData() {
        let endpoint = `${baseUrl}/member`
        axios.get(endpoint, authorization)
            .then(response => {
                this.setState({ members: response.data })
            })
            .catch(error => console.log(error))
    }

    componentDidMount() {
        //fungsi ini dijalankan setelah fungsi render berjalan
        this.getData()
        let user = JSON.parse(localStorage.getItem("user"))
        //cara pertama
        this.setState({
            role: user.role
        })

        //cara kedua
        if (user.role === 'admin' || user.role === 'kasir') {
            this.setState({
                visible: true
            })
        } else {
            this.setState({
                visible: false
            })
        }
    }
    // showAddButton() {
    //     if (this.state.role === 'admin' || this.state.role === 'kasir') {
    //         <button type="button" className="btn btn-sm btn-outline-dark my-2" onClick={() => this.tambahData()}>
    //             Tambah data member
    //         </button>
    //     }
    // }
    render() {
        return (
            <div className="container">
                <div className="card">
                    <div className="card-header bg-primary">
                        <h3 className="text-white">
                            List of Member
                        </h3>
                    </div>
                    <div className="card-body">
                        <ul className="list-group">
                            {this.state.members.map(member => (
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col-lg-5">
                                            <small className="text-info">Nama</small> <br />
                                            <h5>{member.nama}</h5>
                                        </div>
                                        <div className="col-lg-2">
                                            <small className="text-info">Jenis Kelamin</small> <br />
                                            <h5>{member.jenis_kelamin}</h5>
                                        </div>
                                        <div className="col-lg-3">
                                            <small className="text-info">Telepon</small> <br />
                                            <h5>{member.telepon}</h5>
                                        </div>
                                        <div className="col-lg-2">
                                            <small className="text-info"></small> <br />
                                            <button className={`btn btn-sm btn-warning mx-1 ${this.state.visible ? `` : `d-none` }`}
                                                onClick={() => this.ubahData(member.id_member)}>
                                                Edit
                                            </button>
                                            <button className={`btn btn-sm btn-danger ${this.state.visible ? `` : `d-none`} `}
                                                onClick={() => this.hapusData(member.id_member)}>
                                                Delete
                                            </button>

                                        </div>
                                        <div className="col-lg-11">
                                            <small className="text-info">Alamat</small> <br />
                                            <h5>{member.alamat}</h5>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <button className= {`btn btn-sm btn-info my-2 ${this.state.visible ? `` : `d-none`}`} onClick={() => this.tambahData()}>
                Tambah data member
            </button>
                    </div>
                </div>

                {/* form modal data member */}
                <div className="modal" id="modal_member">
                    <div className="modal-dialog modal-md">
                        <div className="modal-content">
                            <div className="modal-header bg-success">
                                <h4 className="text-white">
                                    Form Data Member
                                </h4>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={ev => this.simpanData(ev)}>
                                    Nama
                                    <input type="text" className="form-control mb-2" value={this.state.nama}
                                        onChange={(ev) => this.setState({ nama: ev.target.value })} />

                                    Alamat
                                    <input type="text" className="form-control mb-2" value={this.state.alamat}
                                        onChange={(ev) => this.setState({ alamat: ev.target.value })} />

                                    Jenis Kelamin
                                    <select className="form-control mb-2" value={this.state.jenis_kelamin}
                                        onChange={(ev) => this.setState({ jenis_kelamin: ev.target.value })}>
                                        <option value="Wanita">Wanita</option>
                                        <option value="Pria">Pria</option>
                                    </select>

                                    Telepon
                                    <input type="text" className="form-control mb-2" value={this.state.telepon}
                                        onChange={(ev) => this.setState({ telepon: ev.target.value })} />

                                    <button className="btn btn-success" type="submit">
                                        Simpan
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default Member