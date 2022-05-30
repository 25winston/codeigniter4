<?php

namespace App\Controllers\api;

use CodeIgniter\API\ResponseTrait;

class Crud extends \CodeIgniter\Controller
{
    use ResponseTrait;
    public function index()
    {
        $db = db_connect();
        try {
            // $builder = $db->table('test')
            //     ->select('*')
            //     ->where('id', 1);
            // echo '<pre>' . $builder->getCompiledSelect() . '</pre>'; //getSQL

            // $query = $builder->get();
            // print_r($query->getResult());

            // return view('welcome_message');

            // $resData = ['a' => 1];
            $resData = '
            {
                "squadName": "Super hero squad",
                "homeTown": "Metro City",
                "formed": 2016,
                "secretBase": "Super tower",
                "active": true,
                "members": [
                  {
                    "name": "Molecule Man",
                    "age": 29,
                    "secretIdentity": "Dan Jukes",
                    "powers": [
                      "Radiation resistance",
                      "Turning tiny",
                      "Radiation blast"
                    ]
                  },
                  {
                    "name": "Madame Uppercut",
                    "age": 39,
                    "secretIdentity": "Jane Wilson",
                    "powers": [
                      "Million tonne punch",
                      "Damage resistance",
                      "Superhuman reflexes"
                    ]
                  },
                  {
                    "name": "Eternal Flame",
                    "age": 1000000,
                    "secretIdentity": "Unknown",
                    "powers": [
                      "Immortality",
                      "Heat Immunity",
                      "Inferno",
                      "Teleportation",
                      "Interdimensional travel"
                    ]
                  }
                ]
              }
            ';

            return $this->setResponseFormat('json')->respond($resData, 200);
        } catch (\Exception $e) {
            die($e->getMessage());
        } finally {
            $db->close();
        }
    }
}
