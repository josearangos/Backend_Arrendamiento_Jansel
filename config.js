module.exports={
    port:process.env.PORT || 4610,
    dbMongo:process.env.MONGODB || 'mongodb://admin_Jansel:jansel@ds249249.mlab.com:49249/db_jansel_arrendamientos',
    prefixRoutes:'/v1',
    agency: {
        name: "Arriendamientos Jansel",
        nit: "1212312121-12121212"
    }
}