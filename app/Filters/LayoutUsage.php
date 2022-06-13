<?php

namespace App\Filters;

use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\IncomingRequest;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;

class LayoutUsage implements FilterInterface
{
    /**
     * @param IncomingRequest $request
     * @param mixed|null      $arguments
     */
    public function before(RequestInterface $request, $arguments = null)
    {
        $urlSegment = explode('/', $_SERVER['REQUEST_URI']);
        $isAPI  = ($request->header('Content-Type') && $request->header('Content-Type')->getValue() === 'application/json') || $urlSegment[1] === 'api';
        $isAjax = $request->isAJAX();
        if ($isAPI || $isAjax) {
            return;
        }

        return service('response')->setBody(view('layouts/layout'));
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
    }
}
