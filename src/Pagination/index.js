import React, { Component } from "react";
import axios from "axios";
import PaginationComponent from "./PaginationComponent";

class Pagination extends Component {
  state = {
    data: [],
    totalRecords: 0,
    limit: 6,
  };
  componentDidMount() {
    this.loadData(1);
  }
  loadData = (page) => {
    console.log("page>>", page);
    axios.get(`https://reqres.in/api/users?page=` + page).then((res) => {
      const data = res.data;
      this.setState({
        data: data.data,
        totalRecords: data.total ? data.total : 0,
        limit: data.per_page ? data.per_page : 6,
      });
    });
  };
  getPaginatedData = (page) => {
    this.loadData(page);
  };
  render() {
    const { data, totalRecords, limit } = this.state;
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th className="align-middle bt-0">ID</th>
              <th className="align-middle bt-0">Avatar</th>
              <th className="align-middle bt-0">Name</th>
              <th className="align-middle bt-0">Email</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((item) => (
                <tr>
                  <td scope="col">{item.id}</td>
                  <td scope="col">
                    <img
                      style={{ height: "50%", borderRadius: 50 }}
                      src={item.avatar}
                    ></img>
                  </td>
                  <td scope="col">
                    {item.first_name} , {item.last_name}
                  </td>
                  <td scope="col">{item.email}</td>
                </tr>
              ))
            ) : (
              <h4>No Record Found! </h4>
            )}
          </tbody>
        </table>
        {totalRecords > 6 && (
          <PaginationComponent
            getAllData={this.getPaginatedData}
            totalRecords={totalRecords}
            itemsCountPerPage={limit}
          />
        )}
      </div>
    );
  }
}

export default Pagination;
