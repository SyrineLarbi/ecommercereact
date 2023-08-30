import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Chart } from 'chart.js/auto'
import { Bar, Line, Doughnut, Radar, PolarArea } from 'react-chartjs-2'
import productservice from '../services/productservice'
import categoryservice from '../services/categoryservice'
import subcategoryservice from '../services/subcategoryservice'

const Layout = () => {
 const [date,setDate] = useState("")
 const [hour,setHours] = useState("")
  //affichage heure et date
  const ViewDate = ()=>{
    var d= new Date();
    var dates = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    console.log(date);
    setDate(dates)
    var hours = d.getHours() + ":" + d.getMinutes();
    setHours(hours)
  }
    
  setTimeout (()=>{ 
    ViewDate()}
    ,1000);
  const [product, setProduct] = useState();
  const GetAllP = () =>{
    productservice.GetAll().then((res)=>{
      console.log(res);
      setProduct(res.data.data)
    }).catch((err)=>{
      console.log(err);
    })
  }
  useEffect(()=>{
    GetAllP();
  },[]);
  const [categories, setCategories] = useState();
  const GetAllC = () =>{
    categoryservice.GetAll().then((res)=>{
      console.log(res);
      setCategories(res.data.data)
    }).catch((err)=>{
      console.log(err);
    })
  }
  useEffect(()=>{
    GetAllC();
  },[])
  const [subcategory, setSubCategory] = useState();
  const GetAllsub = () =>{
    subcategoryservice.GetAll().then((res)=>{
      console.log(res);
      setSubCategory(res.data.data)
    }).catch((err)=>{
      console.log(err);
    })
  }
  useEffect(()=>{
    GetAllsub();
  })
  
  return (
<div>
      <div>
          {/* START BREADCRUMB */}
          <ul className="breadcrumb">
          <li><a href="#">Home</a></li>                    
          <li className="active">Dashboard</li>
            </ul>
        {/* END BREADCRUMB */}                       
        {/* PAGE CONTENT WRAPPER */}
        <div className="page-content-wrap">
          {/* START WIDGETS */}                    
          <div className="row">
            <div className="col-md-3">
              {/* START WIDGET SLIDER */}
              <div className="widget widget-default widget-carousel">
                <div className="owl-carousel" id="owl-example">
                  <div>                                    
                    <div className="widget-title">Total Visitors</div>                                                                        
                    <div className="widget-subtitle">27/08/2014 15:23</div>
                    <div className="widget-int">3,548</div>
                  </div>
                  <div>                                    
                    <div className="widget-title">Returned</div>
                    <div className="widget-subtitle">Visitors</div>
                    <div className="widget-int">1,695</div>
                  </div>
                  <div>                                    
                    <div className="widget-title">New</div>
                    <div className="widget-subtitle">Visitors</div>
                    <div className="widget-int">1,977</div>
                  </div>
                </div>                            
                <div className="widget-controls">                                
                  <a href="#" className="widget-control-right widget-remove" data-toggle="tooltip" data-placement="top" title="Remove Widget"><span className="fa fa-times" /></a>
                </div>                             
              </div>         
              {/* END WIDGET SLIDER */}
            </div>
            <div className="col-md-3">
              {/* START WIDGET MESSAGES */}
              <div className="widget widget-default widget-item-icon" onclick="location.href='pages-messages.html';">
                <div className="widget-item-left">
                  <span className="fa fa-envelope" />
                </div>                             
                <div className="widget-data">
                  <div className="widget-int num-count">{product?.length}</div>
                  <div className="widget-title">Product</div>
                  <div className="widget-subtitle">In your mailbox</div>
                </div>     
                <div className="widget-controls">                                
                  <a href="#" className="widget-control-right widget-remove" data-toggle="tooltip" data-placement="top" title="Remove Widget"><span className="fa fa-times" /></a>
                </div>
              </div>                            
              {/* END WIDGET MESSAGES */}
            </div>
            <div className="col-md-3">
              {/* START WIDGET REGISTRED */}
              <div className="widget widget-default widget-item-icon" onclick="location.href='pages-address-book.html';">
                <div className="widget-item-left">
                  <span className="fa fa-user" />
                </div>
                <div className="widget-data">
                  <div className="widget-int num-count">{categories?.length}</div>
                  <div className="widget-title">Categories</div>
                  <div className="widget-subtitle">On your website</div>
                </div>
                <div className="widget-controls">                                
                  <a href="#" className="widget-control-right widget-remove" data-toggle="tooltip" data-placement="top" title="Remove Widget"><span className="fa fa-times" /></a>
                </div>                            
              </div>                            
              {/* END WIDGET REGISTRED */}
            </div>
            <div className="col-md-3">
              {/* START WIDGET CLOCK */}
              <div className="widget widget-info widget-padding-sm">
                <div className="widget-big-int plugin-clock">{hour}</div>                            
                <div className="widget-subtitle plugin-date">{date}</div>
                <div className="widget-controls">                                
                  <a href="#" className="widget-control-right widget-remove" data-toggle="tooltip" data-placement="left" title="Remove Widget"><span className="fa fa-times" /></a>
                </div>                            
                <div className="widget-buttons widget-c3">
                  <div className="col">
                    <a href="#"><span className="fa fa-clock-o" /></a>
                  </div>
                  <div className="col">
                    <a href="#"><span className="fa fa-bell" /></a>
                  </div>
                  <div className="col">
                    <a href="#"><span className="fa fa-calendar" /></a>
                  </div>
                </div>                            
              </div>                        
              {/* END WIDGET CLOCK */}
            </div>
          </div>
          {/* END WIDGETS */}                    
          <div className="row">
            <div className="col-md-4">
              {/* START USERS ACTIVITY BLOCK */}
              <div className="panel panel-default">
                <div className="panel-heading">
                  <div className="panel-title-box">
                    <h3>Users Activity</h3>
                    <span>Users vs returning</span>
                  </div>                                    
                  <ul className="panel-controls" style={{marginTop: 2}}>
                    <li><a href="#" className="panel-fullscreen"><span className="fa fa-expand" /></a></li>
                    <li><a href="#" className="panel-refresh"><span className="fa fa-refresh" /></a></li>
                    <li className="dropdown">
                      <a href="#" className="dropdown-toggle" data-toggle="dropdown"><span className="fa fa-cog" /></a>                                        
                      <ul className="dropdown-menu">
                        <li><a href="#" className="panel-collapse"><span className="fa fa-angle-down" /> Collapse</a></li>
                        <li><a href="#" className="panel-remove"><span className="fa fa-times" /> Remove</a></li>
                      </ul>                                        
                    </li>                                        
                  </ul>                                    
                </div>                                
                <div className="panel-body padding-0">
                  <div className="chart-holder" id="dashboard-bar-1" style={{height: 200}} />
                </div>                                    
              </div>
              {/* END USERS ACTIVITY BLOCK */}
            </div>
            <div className="col-md-4">
              {/* START VISITORS BLOCK */}
              <div className="panel panel-default">
                <div className="panel-heading">
                  <div className="panel-title-box">
                    <h3>Visitors</h3>
                    <span>Visitors (last month)</span>
                  </div>
                  <ul className="panel-controls" style={{marginTop: 2}}>
                    <li><a href="#" className="panel-fullscreen"><span className="fa fa-expand" /></a></li>
                    <li><a href="#" className="panel-refresh"><span className="fa fa-refresh" /></a></li>
                    <li className="dropdown">
                      <a href="#" className="dropdown-toggle" data-toggle="dropdown"><span className="fa fa-cog" /></a>                                        
                      <ul className="dropdown-menu">
                        <li><a href="#" className="panel-collapse"><span className="fa fa-angle-down" /> Collapse</a></li>
                        <li><a href="#" className="panel-remove"><span className="fa fa-times" /> Remove</a></li>
                      </ul>                                        
                    </li>                                        
                  </ul>
                </div>
                <div className="panel-body padding-0">
                  <div className="chart-holder" id="dashboard-donut-1" style={{height: 200}} />
                </div>
              </div>
              {/* END VISITORS BLOCK */}
            </div>
            <div className="col-md-4">
              {/* START PROJECTS BLOCK */}
              <div className="panel panel-default">
                <div className="panel-heading">
                  <div className="panel-title-box">
                    <h3>Projects</h3>
                    <span>Projects activity</span>
                  </div>                                    
                  <ul className="panel-controls" style={{marginTop: 2}}>
                    <li><a href="#" className="panel-fullscreen"><span className="fa fa-expand" /></a></li>
                    <li><a href="#" className="panel-refresh"><span className="fa fa-refresh" /></a></li>
                    <li className="dropdown">
                      <a href="#" className="dropdown-toggle" data-toggle="dropdown"><span className="fa fa-cog" /></a>                                        
                      <ul className="dropdown-menu">
                        <li><a href="#" className="panel-collapse"><span className="fa fa-angle-down" /> Collapse</a></li>
                        <li><a href="#" className="panel-remove"><span className="fa fa-times" /> Remove</a></li>
                      </ul>                                        
                    </li>                                        
                  </ul>
                </div>
                <div className="panel-body panel-body-table">
                  <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th width="50%">Project</th>
                          <th width="20%">Status</th>
                          <th width="30%">Activity</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><strong>Joli Admin</strong></td>
                          <td><span className="label label-danger">Developing</span></td>
                          <td>
                            <div className="progress progress-small progress-striped active">
                              <div className="progress-bar progress-bar-danger" role="progressbar" aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} style={{width: '85%'}}>85%</div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td><strong>Gemini</strong></td>
                          <td><span className="label label-warning">Updating</span></td>
                          <td>
                            <div className="progress progress-small progress-striped active">
                              <div className="progress-bar progress-bar-warning" role="progressbar" aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} style={{width: '40%'}}>40%</div>
                            </div>
                          </td>
                        </tr>                                                
                        <tr>
                          <td><strong>Taurus</strong></td>
                          <td><span className="label label-warning">Updating</span></td>
                          <td>
                            <div className="progress progress-small progress-striped active">
                              <div className="progress-bar progress-bar-warning" role="progressbar" aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} style={{width: '72%'}}>72%</div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td><strong>Leo</strong></td>
                          <td><span className="label label-success">Support</span></td>
                          <td>
                            <div className="progress progress-small progress-striped active">
                              <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} style={{width: '100%'}}>100%</div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td><strong>Virgo</strong></td>
                          <td><span className="label label-success">Support</span></td>
                          <td>
                            <div className="progress progress-small progress-striped active">
                              <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} style={{width: '100%'}}>100%</div>
                            </div>
                          </td>
                        </tr>                                                
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              {/* END PROJECTS BLOCK */}
            </div>
          </div>
          <div className="row">
            <div className="col-md-8">
              {/* START SALES BLOCK */}
              <div className="panel panel-default">
                <div className="panel-heading">
                  <div className="panel-title-box">
                    <h3>Sales</h3>
                    <span>Sales activity by period you selected</span>
                  </div>                                     
                  <ul className="panel-controls panel-controls-title">                                        
                    <li>
                      <div id="reportrange" className="dtrange">                                            
                        <span /><b className="caret" />
                      </div>                                     
                    </li>                                
                    <li><a href="#" className="panel-fullscreen rounded"><span className="fa fa-expand" /></a></li>
                  </ul>                                    
                </div>
                <div className="panel-body">                                    
                  <div className="row stacked">
                    <div className="col-md-4">                                            
                      <div className="progress-list">                                               
                        <div className="pull-left"><strong>In Queue</strong></div>
                        <div className="pull-right">75%</div>                                                
                        <div className="progress progress-small progress-striped active">
                          <div className="progress-bar progress-bar-primary" role="progressbar" aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} style={{width: '75%'}}>75%</div>
                        </div>
                      </div>
                      <div className="progress-list">                                               
                        <div className="pull-left"><strong>Shipped Products</strong></div>
                        <div className="pull-right">450/500</div>                                                
                        <div className="progress progress-small progress-striped active">
                          <div className="progress-bar progress-bar-primary" role="progressbar" aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} style={{width: '90%'}}>90%</div>
                        </div>
                      </div>
                      <div className="progress-list">                                               
                        <div className="pull-left"><strong className="text-danger">Returned Products</strong></div>
                        <div className="pull-right">25/500</div>                                                
                        <div className="progress progress-small progress-striped active">
                          <div className="progress-bar progress-bar-danger" role="progressbar" aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} style={{width: '5%'}}>5%</div>
                        </div>
                      </div>
                      <div className="progress-list">                                               
                        <div className="pull-left"><strong className="text-warning">Progress Today</strong></div>
                        <div className="pull-right">75/150</div>                                                
                        <div className="progress progress-small progress-striped active">
                          <div className="progress-bar progress-bar-warning" role="progressbar" aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} style={{width: '50%'}}>50%</div>
                        </div>
                      </div>
                      <p><span className="fa fa-warning" /> Data update in end of each hour. You can update it manual by pressign update button</p>
                    </div>
                    <div className="col-md-8">
                      <div id="dashboard-map-seles" style={{width: '100%', height: 200}} />
                    </div>
                  </div>                                    
                </div>
              </div>
              {/* END SALES BLOCK */}
            </div>
            <div className="common-modal modal fade" id="common-Modal1" tabIndex={-1} role="dialog" aria-hidden="true">
              <div className="modal-content">
                <ul className="list-inline item-details">
                  <li><a href="http://themifycloud.com/downloads/janux-premium-responsive-bootstrap-admin-dashboard-template/">Admin templates</a></li>
                  <li><a href="http://themescloud.org">Bootstrap themes</a></li>
                </ul>
              </div>
            </div>
            <div className="col-md-4">
              {/* START SALES & EVENTS BLOCK */}
              <div className="panel panel-default">
                <div className="panel-heading">
                  <div className="panel-title-box">
                    <h3>Sales &amp; Event</h3>
                    <span>Event "Purchase Button"</span>
                  </div>
                  <ul className="panel-controls" style={{marginTop: 2}}>
                    <li><a href="#" className="panel-fullscreen"><span className="fa fa-expand" /></a></li>
                    <li><a href="#" className="panel-refresh"><span className="fa fa-refresh" /></a></li>
                    <li className="dropdown">
                      <a href="#" className="dropdown-toggle" data-toggle="dropdown"><span className="fa fa-cog" /></a>                                        
                      <ul className="dropdown-menu">
                        <li><a href="#" className="panel-collapse"><span className="fa fa-angle-down" /> Collapse</a></li>
                        <li><a href="#" className="panel-remove"><span className="fa fa-times" /> Remove</a></li>
                      </ul>                                        
                    </li>                                        
                  </ul>
                </div>
                <div className="panel-body padding-0">
                  <div className="chart-holder" id="dashboard-line-1" style={{height: 200}} />
                  <Doughnut
                  data={{
                    labels: product?.map((x) => x.name),
                    datasets: [
                      {
                        label: "# of Votes",
                        data: product?.map((x) => x.qte),
                        backgroundColor: [
                          "rgba(250, 10, 132, 0.8)",
                          "rgba(54, 162, 235, 0.5)",
                          "rgba(255, 206, 86, 0.8)",
                          "rgba(75, 192, 192, 0.7)",
                          "rgba(153, 102, 255, 0.8)",
                          "rgba(255, 159, 64, 0.7)",
                        ],
                        borderColor: [
                          "rgba(255, 99, 132, 1)",
                          "rgba(54, 162, 235, 1)",
                          "rgba(255, 206, 86, 1)",
                          "rgba(75, 192, 192, 1)",
                          "rgba(153, 102, 255, 1)",
                          "rgba(255, 159, 64, 1)",
                        ],
                        borderWidth: 1,
                      },
                    ],
                  }}
                  options={{
                    scales: {
                      y: {
                        beginAtZero: true,
                      },
                    },
                  }}
                />
                </div>
              </div>
              <div className="panel-body padding-0">
                  <div className="chart-holder" id="dashboard-line-1" style={{height: 200}} />
                  <Bar
                  data={{
                    labels: product?.map((x) => x.name),
                    datasets: [
                      {
                        label: "# of Votes",
                        data: product?.map((x) => x.price),
                        backgroundColor: [
                          "rgba(250, 10, 132, 0.8)",
                          "rgba(54, 162, 235, 0.5)",
                          "rgba(255, 206, 86, 0.8)",
                          "rgba(75, 192, 192, 0.7)",
                          "rgba(153, 102, 255, 0.8)",
                          "rgba(255, 159, 64, 0.7)",
                        ],
                        borderColor: [
                          "rgba(255, 99, 132, 1)",
                          "rgba(54, 162, 235, 1)",
                          "rgba(255, 206, 86, 1)",
                          "rgba(75, 192, 192, 1)",
                          "rgba(153, 102, 255, 1)",
                          "rgba(255, 159, 64, 1)",
                        ],
                        borderWidth: 1,
                      },
                    ],
                  }}
                  options={{
                    scales: {
                      y: {
                        beginAtZero: true,
                      },
                    },
                  }}
                />
                </div>
              {/* END SALES & EVENTS BLOCK */}
            </div>
          </div>
          {/* START DASHBOARD CHART */}
          <div className="chart-holder" id="dashboard-area-1" style={{height: 200}} />
          <div className="block-full-width">
          </div>                    
          {/* END DASHBOARD CHART */}
        </div>
        {/* END PAGE CONTENT WRAPPER */}                                
      </div>            
    <div className="message-box animated fadeIn" data-sound="alert" id="mb-signout">
      <div className="mb-container">
        <div className="mb-middle">
          <div className="mb-title"><span className="fa fa-sign-out" /> Log <strong>Out</strong> ?</div>
          <div className="mb-content">
            <p>Are you sure you want to log out?</p>                    
            <p>Press No if youwant to continue work. Press Yes to logout current user.</p>
          </div>
          <div className="mb-footer">
            <div className="pull-right">
              <a href="pages-login.html" className="btn btn-success btn-lg">Yes</a>
              <button className="btn btn-default btn-lg mb-control-close">No</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* END MESSAGE BOX*/}
    <div/>
</div>
  )
}

export default Layout