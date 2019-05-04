const leboncoin = require('leboncoin-api');

module.exports = {
    search_function: function (search_query,zip_code,rooms,square,reply,res){
        var average= 0;
        var nbRecherches=0;
                        var search = new leboncoin.Search()
                            //.setPage(1)
                            .setQuery(search_query)
                            //.setFilter(leboncoin.FILTERS.PARTICULIER)
                            .setCategory("locations")
                            // .setRegion("ile_de_france")
                            // .setDepartment("yvelines")
                            .setLocation([
                                        {"zipcode": zip_code}
                                        ])
                        //Search around you with latitude and longitude of your position and a radius in meters. Doing so you don't need to set Region, Department and Location
                        //Exemple for 30km around Lyon
                        //.setArea({"lat": 43.685690799999996, "lng": 1.417239, "radius": 50000})
                            //.addSearchExtra("price", {min: 100, max: 600}) // will add a range of price
                            .addSearchExtra('real_estate_type', ["2", "Appartement"]) // will add enums for Meublé and Non meublé
                            .addSearchExtra('rooms', [rooms, rooms]) // Nbr de pièces
                            //.addSearchExtra('square', [square, square]); // superficie

                        // Please check into categories & sub categories constants to know which are the sub categories to add into "addSearchExtra"
                        search.run().then(function (data) {
                            nbRecherches=data.nbResult;
                            //console.log(data.page); // the current page
                            console.log(data.pages); // the number of pages
                            console.log(data.nbResult); // the number of results for this search
                            //console.log(data.results.); // the array of results
                            data.results
                            // .filter(item => { //Filtrer à 10 m² autour de la surface renseignée
                            //     console.log(parseInt(square,10)-10 <=parseInt(item.attributes.square,10));
                            //     return parseInt(square,10) <=parseInt(item.attributes.square,10) &&
                            //     parseInt(square,10) >= parseInt(item.attributes.square,10);
                            // })
                            .forEach(item => {
                                console.log(parseInt(item.price,10));

                                if(parseInt(square,10)-5 <=parseInt(item.attributes.square,10) &&
                                parseInt(square,10)+5 >= parseInt(item.attributes.square,10)){
                                    average+=item.price;
                                    console.log(item.price);
                                    //console.log(item.attributes.square);
                                }
                            });
                            reply+= "<br/> Nb de Résultats: " + nbRecherches +
                                "<br/> Prix médian: <b>" + average+ "€ </b>" ; 
                            res.send(reply);
                            // if(data.results.length){
                            //     data.results[0].getDetails().then(function (details) {
                            //         console.log("*****",details); // the item 0 with more data such as description, all images, author, ...
                            //     }, function (err) {
                            //         console.error(err);
                            //     });
                            //     data.results[0].getPhoneNumber().then(function (phoneNumer) {
                            //         console.log(phoneNumer); // the phone number of the author if available
                            //     }, function (err) {
                            //         console.error(err); // if the phone number is not available or not parsable (image -> string) 
                            //     });
                            // }
                        }, function (err) {
                            console.error(err);
                            return "error";
                        });
                        
                    }
}