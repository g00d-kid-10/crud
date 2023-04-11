$("#add_user").submit(event => {
    alert("data inserted sucessfully")
})

$("#update_user").submit(event => {
    event.preventDefault()
    var unindexed_array = $("#update_user").serializeArray()
    var data ={}
    
    $.map(unindexed_array, (n, i) => {
        data[n['name']] = n['value']
    })

    var request = {
        "url" : `http://13.233.150.17:3000/api/users/${data.id}`,
        "method" : "PUT",
        "data" : data
    }

    $.ajax(request).done(() => {
        alert("data updated successfully")
    })
})

if(window.location.pathname == '/') {
    $ondelete = $(".delete")
    $ondelete.click(function() {
        // var id = $($ondelete).attr("data-")

        var id = $(this).attr("data-rank")
        console.log(id)
        var request = {
            "url" : `http://13.233.150.17:3000/api/users/${id}`,
            "method" : "DELETE"
        }

        if(confirm(`Are you sure to delete?`)) {
            $.ajax(request).done(() => {
                location.reload();
                alert(`user is successfully deleted`)
            })
        }
    })
}

// MY Understanding: Axios is used when server is making calls to external API[MongoDB here]
// While AJAX is used by server to handle the query requests that are made by client browser.