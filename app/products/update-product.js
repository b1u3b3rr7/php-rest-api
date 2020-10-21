$(document).ready(function () {
    // show html form when 'update product' button was clicked
    $(document).on('click', '.update-product-button', function () {
        // get product id
        var id = $(this).attr('data-id');

        // read one record based on given product id
        $.getJSON("http://127.0.0.1/php-rest-api/api/product/read_one.php?id=" + id, function (data) {
            // values will be used to fill out our form
            var name = data.name;
            var price = data.price;
            var description = data.description;
            var category_id = data.category_id;
            var category_name = data.category_name;

            // load list of categories
            $.getJSON("http://127.0.0.1/php-rest-api/api/category/read.php", function (data) {
                // build 'categories option' html
                // loop through returned list of data
                var categories_options_html = `<select name='category_id' class='form-control'>`;

                $.each(data.records, function (key, val) {
                    // pre-select option is category id is the same
                    if (val.id == category_id) { categories_options_html += `<option value='` + val.id + `' selected>` + val.name + `</option>`; }
                    else { categories_options_html += `<option value='` + val.id + `'>` + val.name + `</option>`; }
                });
                categories_options_html += `</select>`;

                // store 'update product' html to this variable
                var update_product_html = `
                    <div id='read-products' class='btn btn-primary pull-right m-b-15px read-products-button'>
                        <span class='glyphicon glyphicon-list'></span> Read Products
                    </div>
                    <!-- build 'update product' html form -->
                    <!-- we used the 'required' html5 property to prevent empty fields -->
                    <form id='update-product-form' action='#' method='post' border='0'>
                        <table class='table table-hover table-responsive table-bordered'>
                            <!-- name field -->
                            <tr>
                                <td>Name</td>
                                <td><input value=\"` + name + `\" type='text' name='name' class='form-control' required /></td>
                            </tr>
                            <!-- price field -->
                            <tr>
                                <td>Price</td>
                                <td><input value=\"` + price + `\" type='number' min='1' name='price' class='form-control' required /></td>
                            </tr>
                            <!-- description field -->
                            <tr>
                                <td>Description</td>
                                <td><textarea name='description' class='form-control' required>` + description + `</textarea></td>
                            </tr>
                            <!-- categories 'select' field -->
                            <tr>
                                <td>Category</td>
                                <td>` + categories_options_html + `</td>
                            </tr>
                            <tr>
                                <!-- hidden 'product id' to identify which record to delete -->
                                <td><input value=\"` + id + `\" name='id' type='hidden' /></td>
                                <!-- button to submit form -->
                                <td>
                                    <button type='submit' class='btn btn-info'>
                                        <span class='glyphicon glyphicon-edit'></span> Update Product
                                    </button>
                                </td>
                            </tr>
                        </table>
                    </form>
                `;

                // inject to 'page-content' of our app
                $("#page-content").html(update_product_html);

                // change page title
                changePageTitle("Update Product");
            });
        });
    });

    // 'update product form' submit handle will be here
});